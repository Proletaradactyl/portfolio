import boatImg from '../../assets/boat.png'; 

const Boat = ({ position }) => (
  <div
    className='absolute z-50 transition-all duration-100 ease-out pointer-events-none'
    style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: `translate(-50%, -50%)`,
      transformStyle: 'preserve-3d',
    }}
  >
    <div className='relative'>
      {/* Enhanced ripple effect */}
      <div className='absolute'>
        <div className='w-20 h-20 rounded-full bg-blue-200 opacity-30 animate-ping'></div>
        <div className='absolute inset-0 w-16 h-16 rounded-full bg-blue-300 opacity-40 animate-pulse'></div>
      </div>

      {/* Enhanced boat */}
      <div
        className='relative text-5xl'
        style={{
          animation: 'gentleBob 3s infinite ease-in-out',
          filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
        }}
      >
        <img
          src={boatImg}
          alt='Boat'
          className='relative z-10'
          style={{ width: '64px', height: '64px', objectFit: 'contain' }}
        />
      </div>

      {/* Wake effect */}
      <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-8 opacity-50'></div>
    </div>
  </div>
);

export default Boat;
