export function RiverClouds({ clouds }) {

  if (!Array.isArray(clouds)) return null;

  return (
    <>
      {clouds.map((cloud) => (
        <div
          key={`cloud-${cloud.i}`}
          className='absolute select-none pointer-events-none'
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            fontSize: `${cloud.size}vmin`,
            opacity: cloud.opacity,
            animation: `cloudFloat ${cloud.speed || 30}s linear infinite`, // default slower speed
            animationDelay: `${cloud.delay}s`,
            zIndex: cloud.zIndex || 1, // allow custom zIndex per cloud
          }}
        >
          ☁️
        </div>
      ))}
    </>
  );
}
