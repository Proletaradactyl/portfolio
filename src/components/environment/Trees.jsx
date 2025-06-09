import React from 'react';

export function RiverTrees({ trees }) {
  return trees.map((tree) => (
    <div
      key={`tree-${tree.i}`}
      className='absolute select-none pointer-events-none'
      style={{
        left: `${tree.baseX}%`,
        top: `${tree.y}%`,
        zIndex: 20,
        transform: 'translateY(-100%)',
        animation: `sway ${2 + tree.sway}s ease-in-out infinite alternate`,
      }}
    >
      <div
        className={`brightness-100 drop-shadow-sm`}
        style={{
          fontSize: `${tree.size}vmin`,
          filter: `hue-rotate(0deg)`,
        }}
      >
        {tree.treeType}
      </div>
    </div>
  ));
}