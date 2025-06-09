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
  const cloudsRef = useRef(null);

  if (!cloudsRef.current) {
    const cloudTypes = ['☁️'];
    cloudsRef.current = [];
    let i = 0;
    while (cloudsRef.current.length < 12 && i < 30) {
      const baseX = Math.random() * 100;
      const y = Math.random() * 40;
      const size = 10 + Math.random() * 20;
      const cloudType = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
      const speed = 20 + Math.random() * 20;
      cloudsRef.current.push({ baseX, y, size, cloudType, speed, i });
      i++;
    }
  }

  return cloudsRef.current;
}