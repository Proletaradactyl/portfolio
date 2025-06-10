// filepath: /Users/karadactyl/Desktop/portfolio/src/hooks/useEnvironmentGeneration.js
import { useRef } from 'react';

export function useRiverTrees() {
  const treesRef = useRef(null);

  if (!treesRef.current) {
    const treeTypes = ['🌲'];
    treesRef.current = [];
    let i = 0;
    while (treesRef.current.length < 40 && i < 100) {
      const isLeft = i % 2 === 0;
      const baseX = isLeft ? Math.random() * 25 : 75 + Math.random() * 25;
      const y = Math.random() * 100;
      const size = 8 + Math.random() * 12;
      const treeType = treeTypes[Math.floor(Math.random() * treeTypes.length)];
      const sway = Math.random() * 2;
      treesRef.current.push({ isLeft, baseX, y, size, treeType, sway, i });
      i++;
    }
  }

  return treesRef.current;
}

export function useClouds() {
  // Example: 8 clouds, some slow, some above trees/buildings
  return [
    { i: 1, x: 0, y: 8, size: 20, opacity: 0.7, speed: 40, delay: 0, zIndex: 21 }, // slow, above
    { i: 2, x: 25, y: 12, size: 30, opacity: 0.5, speed: 50, delay: 2, zIndex: 31 },
    { i: 3, x: 40, y: 5, size: 20, opacity: 0.6, speed: 55, delay: 4, zIndex: 10 }, // slow, above
    { i: 4, x: 55, y: 15, size: 35, opacity: 0.4, speed: 20, delay: 1, zIndex: 1 },
    { i: 5, x: 70, y: 10, size: 25, opacity: 0.8, speed: 60, delay: 3, zIndex: 21 }, // slowest, highest
    { i: 6, x: 80, y: 60, size: 30, opacity: 0.5, speed: 70, delay: 2, zIndex: 2 },
    { i: 7, x: 60, y: 40, size: 10, opacity: 0.6, speed: 25, delay: 5, zIndex: 31 },
    { i: 8, x: 20, y: 50, size: 18, opacity: 0.4, speed: 25, delay: 0, zIndex: 1 },
    { i: 9, x: 0, y: 70, size: 20, opacity: 0.7, speed: 40, delay: 0, zIndex: 21 },
    { i: 10, x: 30, y: 20, size: 25, opacity: 0.5, speed: 50, delay: 0, zIndex: 2 },
    { i: 11, x: 50, y: 30, size: 15, opacity: 0.6, speed: 35, delay: 4, zIndex: 10 }, // slow, above
    { i: 12, x: 70, y: 25, size: 35, opacity: 0.4, speed: 20, delay: 1, zIndex: 1 },
    { i: 13, x: 90, y: 35, size: 30, opacity: 0.8, speed: 60, delay: 3, zIndex: 21 }, // slowest, highest
    { i: 14, x: 80, y: 55, size: 40, opacity: 0.5, speed: 60, delay: 2, zIndex: 2 },
    { i: 15, x: 60, y: 45, size: 10, opacity: 0.6, speed: 35, delay: 5, zIndex: 21 },
    { i: 16, x: 20, y: 65, size: 18, opacity: 0.4, speed: 25, delay: 0, zIndex: 1 }
  ];
}