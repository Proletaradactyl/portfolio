import React from 'react';

export function renderWaves() {
  return Array(12)
    .fill()
    .map((_, i) => (
      <div
        key={i}
        className='absolute inset-0'
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(147, 197, 253, 0.2) 25%, 
            rgba(147, 197, 253, 0.3) 50%, 
            rgba(147, 197, 253, 0.2) 75%, 
            transparent 100%)`,
          transform: `translateX(${-100 + i * 10}%) translateY(${i * 2}px) scaleY(${0.5 + i * 0.05})`,
          animation: `wave ${8 + i * 0.5}s linear infinite`,
          animationDelay: `${-i * 0.3}s`,
          opacity: 0.6 + i * 0.03,
        }}
      />
    ));
}