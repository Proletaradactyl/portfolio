import { useEffect } from 'react';

/**
 * Custom hook to handle boat movement based on mouse position.
 * @param {Function} setBoatPosition - Setter for boat position state.
 * @param {boolean} modalLocked - Whether modal is open/locked (prevents movement).
 * @param {number} riverLeft - Left river boundary (percentage).
 * @param {number} riverRight - Right river boundary (percentage).
 */
export function useBoatMovement(setBoatPosition, modalLocked, riverLeft, riverRight) {
  useEffect(() => {
    if (modalLocked) return;

    const handleMouseMove = (e) => {
      const river = document.getElementById('river-area');
      if (!river) return;

      const rect = river.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp boat to river boundaries
      const clampedX = Math.max(riverLeft, Math.min(x, riverRight));
      const clampedY = Math.max(0, Math.min(y, 100));

      setBoatPosition({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setBoatPosition, modalLocked, riverLeft, riverRight]);
}