import React from 'react';
import { renderWaves } from './waves';

// Renders the left and right river banks
export function renderBanks() {
  return (
    <>
      {/* Left Bank */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-b from-amber-900/90 to-amber-700/80 z-10"
        style={{ filter: 'blur(0.5px)' }}
      />
      {/* Right Bank */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-b from-amber-900/90 to-amber-700/80 z-10"
        style={{ filter: 'blur(0.5px)' }}
      />
    </>
  );
}

// Renders the river with waves and optional children (e.g., river bottom texture)
export function renderRiver(children = null) {
  return (
    <div
      className="absolute left-1/2 top-0 bottom-0 w-1/3 transform -translate-x-1/2 transition-colors duration-500 bg-gradient-to-b from-blue-400 to-blue-600 z-20"
    >
      {renderWaves()}
      {children}
    </div>
  );
}

// Renders the sky background
export function renderSky() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-blue-300 -z-10" />
  );
}