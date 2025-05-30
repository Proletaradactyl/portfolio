import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github,
  Mail,
  Linkedin,
  User,
  Briefcase,
  BookOpen,
  Home,
} from 'lucide-react';

const ThirdPersonRiverPortfolio = () => {
  const [boatPosition, setBoatPosition] = useState({ x: 50, y: 80 });
  const [activeSection, setActiveSection] = useState(null);
  const [modalLocked, setModalLocked] = useState(false);
  const [boatSpeed, setBoatSpeed] = useState(2);
  const treesRef = useRef(null);
  const cloudsRef = useRef(null);

  // Define river boundaries (as percentages)
  const riverLeft = 33.33;
  const riverRight = 66.66;

  // Memoize landmarks to avoid unnecessary re-renders
  const landmarks = useMemo(
    () => [
      {
        id: 'about',
        name: 'About Me',
        icon: <User />,
        position: { x: 33.33, y: 10 }, // align with left river bank
        side: 'left',
        building: {
          type: 'cabin',
          color: 'bg-gradient-to-t from-amber-800 to-amber-600',
        },
      },
      {
        id: 'skills',
        name: 'Skills',
        icon: <BookOpen />,
        position: { x: 40, y: 50 }, // moved lower
        side: 'left',
        building: {
          type: 'library',
          color: 'bg-gradient-to-t from-emerald-800 to-emerald-600',
        },
      },
      {
        id: 'projects',
        name: 'Projects',
        icon: <Briefcase />,
        position: { x: 70, y: 60 }, // moved lower
        side: 'right',
        building: {
          type: 'workshop',
          color: 'bg-gradient-to-t from-blue-800 to-blue-600',
        },
      },
      {
        id: 'contact',
        name: 'Contact',
        icon: <Mail />,
        position: { x: 66, y: 20 }, // moved lower
        side: 'right',
        building: {
          type: 'post',
          color: 'bg-gradient-to-t from-red-800 to-red-600',
        },
      },
      {
        id: 'home',
        name: 'Home',
        icon: <Home />,
        position: { x: 50, y: 80 }, // stays near bottom
        side: 'bottom',
        building: {
          type: 'dock',
          color: 'bg-gradient-to-t from-slate-700 to-slate-500',
        },
      },
    ],
    [] // No dependencies, so only created once
  );

  // Generate trees only once
  if (!treesRef.current) {
    const treeTypes = ['🌲'];
    treesRef.current = [];
    let i = 0;
    while (treesRef.current.length < 40 && i < 100) {
      // safety limit
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

  // Generate clouds only once
  if (!cloudsRef.current) {
    cloudsRef.current = Array.from({ length: 12 }).map((_, i) => {
      const x = Math.random() * 120 - 10;
      const y = Math.random() * 30;
      const size = 8 + Math.random() * 15;
      const speed = 100 + Math.random() * 200;
      const opacity = 0.5 + Math.random() * 0.4;
      const delay = -Math.random() * speed;
      return { x, y, size, speed, opacity, delay, i };
    });
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newX = boatPosition.x;
      let newY = boatPosition.y;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          newY = Math.max(boatPosition.y - boatSpeed, 5);
          break;
        case 'arrowdown':
        case 's':
          newY = Math.min(boatPosition.y + boatSpeed, 95);
          break;
        case 'arrowleft':
        case 'a':
          newX = Math.max(boatPosition.x - boatSpeed, riverLeft);
          break;
        case 'arrowright':
        case 'd':
          newX = Math.min(boatPosition.x + boatSpeed, riverRight);
          break;
        case '=':
          break;
        case ' ':
          e.preventDefault();
          setBoatSpeed((prev) => (prev === 2 ? 4 : 2));
          return;
        default:
          return;
      }

      setBoatPosition({ x: newX, y: newY });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [boatPosition, boatSpeed]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (modalLocked) return; // Prevent boat movement when modal is locked

      // Get bounding rect of the main container
      const container = document.body;
      const rect = container.getBoundingClientRect();

      // Calculate mouse position as percentage of viewport
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp to river boundaries
      const clampedX = Math.max(riverLeft, Math.min(mouseX, riverRight));
      const clampedY = Math.max(5, Math.min(mouseY, 95));

      setBoatPosition({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [riverLeft, riverRight, modalLocked]);

  // Effect to update activeSection only when modal is not locked
  useEffect(() => {
    if (modalLocked) return;
    const nearbyLandmark = landmarks.find((landmark) => {
      const distance = Math.sqrt(
        Math.pow(landmark.position.x - boatPosition.x, 2) +
          Math.pow(landmark.position.y - boatPosition.y, 2)
      );
      return distance < 8;
    });

    setActiveSection(nearbyLandmark?.id || null);
  }, [boatPosition, landmarks, modalLocked]);

  const renderWaves = () => {
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
            transform: `translateX(${-100 + i * 10}%) translateY(${
              i * 2
            }px) scaleY(${0.5 + i * 0.05})`,
            animation: `wave ${8 + i * 0.5}s linear infinite`,
            animationDelay: `${-i * 0.3}s`,
            opacity: 0.6 + i * 0.03,
          }}
        />
      ));
  };

  const renderEnvironment = () => {
    const elements = [];

    // Use static trees
    treesRef.current.forEach((tree) => {
      elements.push(
        <div
          key={`tree-${tree.i}`}
          className='absolute select-none'
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
              filter: `hue-rotate(0deg)`, // Remove random hue for consistency
            }}
          >
            {tree.treeType}
          </div>
        </div>
      );
    });

    // Clouds (use static data)
    cloudsRef.current.forEach((cloud) => {
      elements.push(
        <div
          key={`cloud-${cloud.i}`}
          className='absolute select-none'
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            fontSize: `${cloud.size}vmin`,
            opacity: cloud.opacity,
            animation: `cloudFloat ${cloud.speed}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
            zIndex: 1,
          }}
        >
          ☁️
        </div>
      );
    });

    return elements;
  };

  const renderBuildings = () => {
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
          className='absolute transform -translate-x-1/2 z-20 cursor-pointer group'
          style={{
            left,
            top: `${landmark.position.y}%`,
          }}
          onClick={() => {
            setActiveSection(landmark.id);
            setModalLocked(true); // Always lock modal on click
          }}
          onMouseEnter={() => {
            setActiveSection(landmark.id);
            setModalLocked(true); // Also lock modal on hover
          }}
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

  const renderSectionContent = () => {
    if (!activeSection) return null;

    const sectionContents = {
      about: (
        <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200'>
          <h2 className='text-3xl font-bold mb-4 text-amber-700'>About Me</h2>
          <p className='mb-3 leading-relaxed'>
            My name is Kara, I'm a passionate full-stack developer who loves
            creating immersive and interactive web experiences. I'm a big fan of
            creative use of space and content driven by user interaction.
          </p>
          <p className='text-sm text-gray-600'>
            This river portfolio showcases my love of creativity and newly
            developing skills using React development technologies.
          </p>
          <div className='mt-4 p-3 bg-amber-50 rounded-lg'>
            <p className='text-sm font-semibold text-amber-800'>
              🚀 Always learning, always building!
            </p>
          </div>
        </div>
      ),
      skills: (
        <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200'>
          <h2 className='text-3xl font-bold mb-4 text-emerald-700'>
            My Skills
          </h2>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold text-lg mb-3 text-blue-600'>
                Frontend
              </h3>
              <div className='space-y-2'>
                {['HTML/CSS', 'JavaScript', 'React', 'Tailwind CSS'].map(
                  (skill, i) => (
                    <div key={skill} className='flex items-center'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                      <span className='text-sm'>{skill}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-3 text-purple-600'>
                Backend
              </h3>
              <div className='space-y-2'>
                {['Node.js', 'Express', 'MongoDB', 'REST APIs'].map(
                  (skill, i) => (
                    <div key={skill} className='flex items-center'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                      <span className='text-sm'>{skill}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      projects: (
        <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200'>
          <h2 className='text-3xl font-bold mb-4 text-blue-700'>My Projects</h2>
          <div className='space-y-4'>
            <div className='border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow'>
              <h3 className='font-semibold text-lg text-blue-600'>
                🚣 River Portfolio
              </h3>
              <p className='text-sm text-gray-600 mb-2'>
                Interactive 3D portfolio with immersive river navigation
              </p>
              <div className='flex flex-wrap gap-1'>
                {['React', 'Tailwind CSS', '3D CSS'].map((tech) => (
                  <span
                    key={tech}
                    className='px-2 py-1 bg-blue-100 text-xs rounded'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className='border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow'>
              <h3 className='font-semibold text-lg text-green-600'>🌤️</h3>
              <p className='text-sm text-gray-600 mb-2'>Pending</p>
              <div className='flex flex-wrap gap-1'>
                {['JavaScript', 'API Integration', 'Chart.js'].map((tech) => (
                  <span
                    key={tech}
                    className='px-2 py-1 bg-green-100 text-xs rounded'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className='border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow'>
              <h3 className='font-semibold text-lg text-purple-600'>📱</h3>
              <p className='text-sm text-gray-600 mb-2'>Pending</p>
              <div className='flex flex-wrap gap-1'>
                {['React', 'Node.js', 'MongoDB'].map((tech) => (
                  <span
                    key={tech}
                    className='px-2 py-1 bg-purple-100 text-xs rounded'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      contact: (
        <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200'>
          <h2 className='text-3xl font-bold mb-4 text-red-700'>
            Let's Connect
          </h2>
          <div className='space-y-4'>
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
              <Mail size={24} className='text-red-500' />
              <div>
                <p className='font-semibold'>Email</p>
                <p className='text-sm text-gray-600'>
                  Proletarodactyl@proton.me
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
              <Linkedin size={24} className='text-blue-600' />
              <div>
                <p className='font-semibold'>LinkedIn</p>
                <p className='text-sm text-gray-600'>
                  linkedin.com/in/kara-g-1765458a
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
              <Github size={24} className='text-gray-800' />
              <div>
                <p className='font-semibold'>GitHub</p>
                <p className='text-sm text-gray-600'>
                  github.com/Proletaradactyl
                </p>
              </div>
            </div>
          </div>
          <div className='mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg'>
            <p className='text-sm font-semibold text-red-800'>
              💬 Always open to new opportunities and collaborations!
            </p>
          </div>
        </div>
      ),
      home: (
        <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200'>
          <h2 className='text-3xl font-bold mb-4 text-slate-700'>
            🏠 Welcome to My River!
          </h2>
          <p className='mb-4 leading-relaxed'>
            Navigate this peaceful river to explore my portfolio. Each building
            along the banks represents a different section of my professional
            journey.
          </p>

          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div className='p-3 bg-blue-50 rounded-lg'>
              <p className='font-semibold text-blue-800 mb-2'>Direct Links:</p>
              <li>•</li>
              <li>•</li>
              <ul className='text-sm space-y-1'></ul>
            </div>
            <div className='p-3 bg-green-50 rounded-lg'>
              <p className='font-semibold text-green-800 mb-2'>🏛️ Locations:</p>
              <ul className='text-sm space-y-1'>
                <li>• 🏠 About (Cabin)</li>
                <li>• 📚 Skills (Library)</li>
                <li>• 💼 Projects (Workshop)</li>
                <li>• 📮 Contact (Post Office)</li>
              </ul>
            </div>
          </div>

          <div className='p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg'>
            <p className='text-sm font-semibold text-purple-800'>
              ✨ Hover over any building to learn more about that section!
            </p>
          </div>
        </div>
      ),
    };

    return <div>{sectionContents[activeSection]}</div>;
  };

  const renderBoat = () => {
    return (
      <div
        className='absolute z-50 transition-all duration-500 ease-out'
        style={{
          left: `${boatPosition.x}%`,
          top: `${boatPosition.y}%`,
          transform: `translate(-50%, -50%)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className='relative'>
          {/* Enhanced ripple effect */}
          <div className='absolute'>
            <div
              className={`w-20 h-20 rounded-full bg-blue-200 opacity-30 animate-ping`}
            ></div>
            <div
              className={`absolute inset-0 w-16 h-16 rounded-full bg-blue-300 opacity-40 animate-pulse`}
            ></div>
          </div>

          {/* Enhanced boat */}
          <div
            className='relative text-5xl'
            style={{
              animation: 'gentleBob 3s infinite ease-in-out',
              filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
            }}
          >
            <span className='relative z-10'>🚣</span>
            {/* Speed indicator */}
            {boatSpeed > 2 && (
              <div className='absolute -top-2 -right-2 text-yellow-400 text-lg animate-bounce'>
                💨
              </div>
            )}
          </div>

          {/* Wake effect */}
          <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-8 opacity-50'></div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden transition-colors duration-500 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 text-slate-800`}
    >
      {/* Enhanced sky with time-of-day effects */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-500 transition-colors duration-1000'></div>

        {/* Sun only */}
        <div className='absolute top-8 right-8 text-6xl transition-all duration-1000 text-yellow-400'>
          ☀️
        </div>
      </div>

      {/* Game area with enhanced perspective */}
      <div>
        <div>
          {/* Enhanced river with depth */}
          <div className='absolute top-0 left-0 w-full h-full'>
            <div
              className={`absolute left-1/2 top-0 bottom-0 w-1/3 transform -translate-x-1/2 transition-colors duration-500 ${'bg-gradient-to-b from-blue-400 to-blue-600'}`}
            >
              {renderWaves()}

              {/* River bottom texture */}
              <div className='absolute inset-0 opacity-20'>
                <div
                  className={`w-full h-full ${'bg-blue-700'}`}
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Enhanced banks with texture */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-1/3 transition-colors duration-500 ${'bg-gradient-to-r from-green-400 to-green-500'}`}
          >
            {/* Grass texture */}
            <div className='absolute inset-0 opacity-30'>
              <div
                className='w-full h-full'
                style={{
                  backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(34, 197, 94, 0.3) 2px,
                  rgba(34, 197, 94, 0.3) 4px
                )`,
                }}
              ></div>
            </div>
          </div>

          <div
            className={`absolute top-0 right-0 bottom-0 w-1/3 transition-colors duration-500 ${'bg-gradient-to-l from-green-400 to-green-500'}`}
          >
            {/* Grass texture */}
            <div className='absolute inset-0 opacity-30'>
              <div
                className='w-full h-full'
                style={{
                  backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 2px,
                  rgba(34, 197, 94, 0.3) 2px,
                  rgba(34, 197, 94, 0.3) 4px
                )`,
                }}
              ></div>
            </div>
          </div>

          {/* Environment details */}
          {renderEnvironment()}

          {/* Buildings */}
          {renderBuildings()}

          {/* Boat */}
          {renderBoat()}
        </div>

        {/* Section content */}
        {activeSection && (
          <div
            className='fixed inset-0 z-40 flex items-center justify-center pointer-events-auto animate-fadeIn'
            onClick={() => {
              setActiveSection(null);
              setModalLocked(false); // Always unlock modal on close
            }}
          >
            <div
              className='relative'
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <button
                className='absolute top-2 right-2 z-50 bg-white rounded-full p-2 shadow hover:bg-gray-200'
                onClick={() => {
                  setActiveSection(null);
                  setModalLocked(false); // Always unlock modal on close
                }}
                aria-label='Close'
              >
                ✕
              </button>
              {renderSectionContent()}
            </div>
          </div>
        )}

        {/* Enhanced CSS animations */}
        <style jsx>{`
          @keyframes wave {
            0% {
              transform: translateX(-100%) translateY(var(--wave-offset, 0))
                scaleY(var(--wave-scale, 1));
            }
            100% {
              transform: translateX(200%) translateY(var(--wave-offset, 0))
                scaleY(var(--wave-scale, 1));
            }
          }

          @keyframes gentleBob {
            0%,
            100% {
              transform: translateY(0) rotate(var(--boat-tilt, 0deg));
            }
            50% {
              transform: translateY(-3px) rotate(var(--boat-tilt, 2deg));
            }
          }

          @keyframes cloudFloat {
            0% {
              transform: translateX(-10vw);
            }
            100% {
              transform: translateX(110vw);
            }
          }

          @keyframes birdFly {
            0% {
              transform: translateX(-5vw) translateY(0);
            }
            25% {
              transform: translateX(25vw) translateY(-10px);
            }
            50% {
              transform: translateX(50vw) translateY(5px);
            }
            75% {
              transform: translateX(75vw) translateY(-5px);
            }
            100% {
              transform: translateX(105vw) translateY(0);
            }
          }

          @keyframes sway {
            0% {
              transform: translateY(-100%) rotate(-1deg);
            }
            100% {
              transform: translateY(-100%) rotate(1deg);
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes ripple {
            0% {
              transform: scale(0.3) translateX(-50%) translateY(-50%);
              opacity: 0.6;
            }
            100% {
              transform: scale(2.5) translateX(-50%) translateY(-50%);
              opacity: 0;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ThirdPersonRiverPortfolio;
