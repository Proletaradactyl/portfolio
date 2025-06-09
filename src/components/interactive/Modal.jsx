import React from 'react';

const SectionModal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn'
      onClick={onClose}
    >
      <div
        className='relative'
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className='absolute top-2 right-2 z-50 bg-white rounded-full p-2 shadow hover:bg-gray-200 text-gray-600 hover:text-gray-800'
          onClick={onClose}
          aria-label='Close'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default SectionModal;