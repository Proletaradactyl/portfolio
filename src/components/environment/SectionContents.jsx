import {
  Github,
  Linkedin,
  MailIcon,
} from 'lucide-react';

// Render modal content for each section, with error boundary
  const renderSectionContent = (section) => {
    if (!section) return null;
    try {
      const sectionContents = {
        about: (
          <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200 max-w-2xl max-h-96 overflow-y-auto'>
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
          <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200 max-w-2xl max-h-96 overflow-y-auto'>
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
                    (skill) => (
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
                  {['Node.js', 'Express', 'MongoDB', 'REST APIs'].map((skill) => (
                    <div key={skill} className='flex items-center'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                      <span className='text-sm'>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
        projects: (
          <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200 max-w-2xl max-h-96 overflow-y-auto'>
            <h2 className='text-3xl font-bold mb-4 text-blue-700'>My Projects</h2>
            <div className='space-y-4'>
              <div className='border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow'>
                <a
                  href='https://app.netlify.com/projects/sage-panda-abf549/' // <-- Replace with your actual project URL
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block w-fit'
                >
                  <h3 className='font-semibold text-lg text-blue-600 hover:underline'>
                    🚣 River Portfolio
                  </h3>
                </a>
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
                <h3 className='font-semibold text-lg text-green-600'>
                  Pending
                </h3>
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
                <h3 className='font-semibold text-lg text-purple-600'>
                  Pending
                </h3>
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
          <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200 max-w-2xl max-h-96 overflow-y-auto'>
            <h2 className='text-3xl font-bold mb-4 text-red-700'>
              Let's Connect
            </h2>
            <div className='space-y-4'>
              <a href='mailto:Proletarodactyl@proton.me' className='block'>
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
                  <MailIcon size={24} className='text-red-500' />
                  <div>
                    <p className='font-semibold'>Email</p>
                    <p className='text-sm text-gray-600'>
                      Proletarodactyl@proton.me
                    </p>
                  </div>
                </div>
              </a>
              <a
                href='https://linkedin.com/in/kara-g-1765458a'
                target='_blank'
                rel='noopener noreferrer'
                className='block'
              >
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
                  <Linkedin size={24} className='text-blue-600' />
                  <div>
                    <p className='font-semibold'>LinkedIn</p>
                    <p className='text-sm text-gray-600'>
                      linkedin.com/in/kara-g-1765458a
                    </p>
                  </div>
                </div>
              </a>
              <a
                href='https://github.com/Proletaradactyl'
                target='_blank'
                rel='noopener noreferrer'
                className='block'
              >
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
                  <Github size={24} className='text-gray-800' />
                  <div>
                    <p className='font-semibold'>GitHub</p>
                    <p className='text-sm text-gray-600'>
                      github.com/Proletaradactyl
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className='mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg'>
              <p className='text-sm font-semibold text-red-800'>
                💬 Always open to new opportunities and collaborations!
              </p>
            </div>
          </div>
        ),
        home: (
          <div className='bg-white bg-opacity-95 p-6 rounded-xl shadow-2xl border border-gray-200 max-w-2xl max-h-96 overflow-y-auto'>
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
                <p className='font-semibold text-blue-800 mb-2'>Navigation:</p>
                <ul className='text-sm space-y-1'>
                  <li>• Move your mouse to sail</li>
                  <li>• Click buildings to explore</li>
                </ul>
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
                ✨ Click on any building to learn more about that section!
              </p>
            </div>
          </div>
        ),
      };
      return sectionContents[section] || null;
    } catch (e) {
      // Fallback UI for unexpected errors
      return (
        <div className='p-6 text-red-700'>
          <h2 className='font-bold text-xl mb-2'>Error</h2>
          <p>Sorry, something went wrong loading this section.</p>
        </div>
      );
    }
  };
export default renderSectionContent;