import React, { useState } from 'react';
const assetContext = require.context('../../assets/certs', false, /\.png$/i);

const certificateImages = assetContext.keys().map((assetPath) => {
  const fileName = assetPath.split('/').pop().replace(/\.png$/i, '');
  const label = fileName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return {
    src: assetContext(assetPath),
    alt: `${label} image`,
    label,
  };
});

const CertificateCarousel = () => {
  const [current, setCurrent] = useState(0);
  const total = certificateImages.length;

  const prev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <div className='bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl border border-gray-200 max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col items-center text-center'>
      <h2 className='text-3xl font-bold mb-6 text-pink-700 w-full'>My Certificates</h2>
      <div className='flex items-center gap-6 mb-4 justify-center w-full'>
        <button
          onClick={prev}
          aria-label='Previous certificate'
          className='text-2xl px-2 py-1 rounded hover:bg-pink-100'
        >
          &#8592;
        </button>
        <img
          src={certificateImages[current].src}
          alt={certificateImages[current].alt}
          className='rounded-lg shadow-md max-h-[70vh] w-auto'
        />
        <button
          onClick={next}
          aria-label='Next certificate'
          className='text-2xl px-2 py-1 rounded hover:bg-pink-100'
        >
          &#8594;
        </button>
      </div>
      <p className='text-sm text-gray-600 mb-2 w-full'>
        {certificateImages[current].label}
      </p>
      <p className='text-sm text-gray-600 w-full'>
        Click the arrows to see different certificates earned for skills I've
        learned!
      </p>
    </div>
  );
};

export default CertificateCarousel;
