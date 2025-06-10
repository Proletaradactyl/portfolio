import { useState, useEffect, useMemo, useCallback, React } from 'react';
import { User, Briefcase, BookOpen, Home, Mail, BicepsFlexed } from 'lucide-react';
import { useRiverTrees, useClouds } from './hooks/useEnvironmentGeneration.js';
import Buildings from './components/interactive/Buildings.jsx';
import { RiverTrees } from './components/environment/Trees.jsx';
import { RiverClouds } from './components/environment/Clouds.jsx';
import SectionModal from './components/interactive/Modal.jsx';
import Boat from './components/interactive/Boat.jsx';
import renderSectionContent from './components/environment/SectionContents.jsx';
import './styles/animations.css';

const RiverPortfolio = () => {
  // Boat position state
  const [boatPosition, setBoatPosition] = useState({ x: 50, y: 80 });
  // Which section modal is open
  const [activeSection, setActiveSection] = useState('home');
  // Locks boat movement when modal is open
  const [modalLocked, setModalLocked] = useState(false);

  // River boundaries (in percent)
  const riverLeft = 33.33;
  const riverRight = 66.66;

  // Memoized landmarks for buildings
  const landmarks = useMemo(
    () => [
      {
        id: 'about',
        name: 'About Me',
        icon: <User />,
        position: { x: 33.33, y: 10 },
        side: 'left',
        building: {
          type: 'cabin',
          color: 'bg-gradient-to-t from-amber-800 to-amber-600',
        },
      },
      {
        id: 'skills',
        name: 'Skills',
        icon: <BicepsFlexed />,
        position: { x: 40, y: 47 },
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
        position: { x: 70, y: 75 },
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
        position: { x: 66, y: 15 },
        side: 'right',
        building: {
          type: 'post',
          color: 'bg-gradient-to-t from-red-800 to-red-600',
        },
      },
      {
        id: 'certificates',
        name: 'Certificates',
        icon: <BookOpen />,
        position: { x: 66, y: 45 },
        side: 'right',
        building: {
          type: 'post',
          color: 'bg-gradient-to-t from-purple-800 to-purple-600',
        },
      },
      {
        id: 'home',
        name: 'Home',
        icon: <Home />,
        position: { x: 50, y: 80 },
        side: 'left',
        building: {
          type: 'dock',
          color: 'bg-gradient-to-t from-slate-700 to-slate-500',
        },
      },
    ],
    []
  );

  // Environment hooks
  const trees = useRiverTrees();
  const clouds = useClouds();

  // Mouse movement for boat (clamped to river)
  useEffect(() => {
    let animationFrameId = null;
    const handleMouseMove = (e) => {
      if (modalLocked) return;
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(() => {
        const container = document.body;
        const rect = container.getBoundingClientRect();
        let mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        let mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX += -3;
        mouseY += -4;
        const clampedX = Math.max(riverLeft, Math.min(mouseX, riverRight));
        const clampedY = Math.max(5, Math.min(mouseY, 95));
        setBoatPosition({ x: clampedX, y: clampedY });
        animationFrameId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [riverLeft, riverRight, modalLocked]);

  // Handlers for modal open/close (memoized)
  const handleBuildingClick = useCallback((landmarkId) => {
    setActiveSection(landmarkId);
    setModalLocked(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setActiveSection(null);
    setModalLocked(false);
  }, []);

  // Render animated river waves
  const renderWaves = () =>
    Array(12)
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
  

  return (
    <div className='relative w-full h-screen overflow-hidden transition-colors duration-500 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 text-slate-800'>
      {/* Sky */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-500 transition-colors duration-1000'></div>
        <div className='absolute top-8 right-8 text-6xl transition-all duration-1000 text-yellow-400'>
          ☀️
        </div>
      </div>

      {/* River and banks */}
      <div>
        {/* River */}
        <div className='absolute left-1/2 top-0 bottom-0 w-1/3 transform -translate-x-1/2 transition-colors duration-500 bg-gradient-to-b from-blue-400 to-blue-600'>
          {renderWaves()}
          <div className='absolute inset-0 opacity-20'>
            <div
              className='w-full h-full bg-blue-700'
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            ></div>
          </div>
        </div>
        {/* Left bank */}
        <div className='absolute top-0 left-0 bottom-0 w-1/3 transition-colors duration-500 bg-gradient-to-r from-green-400 to-green-500'>
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
        {/* Right bank */}
        <div className='absolute top-0 right-0 bottom-0 w-1/3 transition-colors duration-500 bg-gradient-to-l from-green-400 to-green-500'>
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

        {/* Environment */}
        <RiverTrees trees={trees} />
        <RiverClouds clouds={clouds} />

        {/* Buildings */}
        <Buildings
          landmarks={landmarks}
          activeSection={activeSection}
          handleBuildingClick={handleBuildingClick}
        />

        {/* Boat */}
        <Boat position={boatPosition} />
      </div>

      {/* Section content modal */}
      <SectionModal open={!!activeSection} onClose={handleModalClose}>
        {renderSectionContent(activeSection)}
      </SectionModal>
    </div>
  );
};

export default RiverPortfolio;
