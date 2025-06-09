import React from 'react';

const Buildings = ({
  landmarks,
  activeSection,
  handleBuildingClick,
}) => {  
    return landmarks.map((landmark) => {
      let left;
      if (landmark.side === 'left') {
        left = '33%';
      } else if (landmark.side === 'right') {
        left = '67%';
      } else {
        left = '50%';
      }

      const isActive = activeSection === landmark.id;

      return (
        <div
          key={`building-${landmark.id}`}
          className='absolute transform -translate-x-1/2 z-30 cursor-pointer group'
          style={{
            left,
            top: `${landmark.position.y}%`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleBuildingClick(landmark.id);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          tabIndex={0}
          role='button'
          aria-label={landmark.name}
        >
          <div className='flex flex-col items-center'>
            {/* Enhanced building with roof */}
            <div
              className={`${landmark.building.color} ${
                isActive ? 'animate-pulse' : ''
              }`}
            ></div>
            <div
              className={`${
                landmark.building.color
              } w-16 h-20 rounded-t-lg shadow-lg flex items-center justify-center relative overflow-hidden
                         ${
                           isActive
                             ? 'ring-4 ring-yellow-400 ring-opacity-75 animate-pulse'
                             : ''
                         }
                         group-hover:scale-105 hover:scale-105 transition-transform duration-300`}
            >
              {/* Icon */}
              <div className='text-white text-xl drop-shadow-lg z-10'>
                {landmark.icon}
              </div>
            </div>

            {/* Foundation with depth */}
            <div
              className={`${landmark.building.color} w-18 h-2 opacity-70`}
            ></div>

            {/* Enhanced label */}
            <div
              className={`mt-2 px-2 py-1 rounded text-xs font-bold text-slate-800 bg-white bg-opacity-75 ${
                isActive ? 'ring-2 ring-yellow-400' : ''
              } transition-all duration-300`}
            >
              {landmark.name}
            </div>

            {/* Interaction hint */}
            {isActive && (
              <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-bounce text-xl'>
                ✨
              </div>
            )}
          </div>
        </div>
      );
    });
  };

export default Buildings;