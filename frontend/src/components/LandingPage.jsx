import { useState } from 'react';
import { AlertCircle, Check, ArrowRight, Sparkles, Lock } from 'lucide-react';
import BackgroundAnimation from './BackgroundAnimation';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const PasswordEntry = ({ onCorrectPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'dothings') {
      onCorrectPassword();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* White background */}
      <div 
        className="fixed inset-0 bg-white"
        style={{ 
          width: '100vw',
          height: '100vh',
          zIndex: -2
        }}
      />
      {/* Background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-90"
        style={{ 
          backgroundImage: 'url("/shutterstock_1108298168-scaled-1.jpg")',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          filter: 'contrast(0.7) brightness(1.2)',
          maskImage: 'linear-gradient(to bottom, rgb(255, 255, 255) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgb(255, 255, 255) 0%, transparent 100%)'
        }}
      />
      
      {/* Background Animation */}
      <BackgroundAnimation />

      <div className="relative z-[1] w-full max-w-md mx-4">
        <form onSubmit={handleSubmit} className="bg-background/80 backdrop-blur-sm p-8 rounded-2xl border border-ink/10 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-ink/10">
              <Lock className="w-6 h-6 text-ink" />
            </div>
            <h2 className="text-2xl font-light text-ink">HandsOn</h2>
          </div>
          
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 border border-ink/20 rounded-xl text-ink placeholder-ink/50 focus:outline-none focus:ring-2 focus:ring-ink/20 text-sm font-['Berkeley_Mono']"
              autoFocus
            />
            {error && (
              <div className="flex items-center space-x-2 text-red-500 text-sm font-['Berkeley_Mono']">
                <AlertCircle className="w-4 h-4" />
                <span>Incorrect password</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-ink hover:bg-ink/90 text-background rounded-xl font-['Berkeley_Mono'] flex items-center justify-center space-x-2 transition-colors text-sm group"
          >
            <span>Enter</span>
            <ArrowRight className="w-4 h-4 group-hover:animate-[bounce-right_1s_ease-in-out_infinite]" />
          </button>
        </form>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  if (!isAuthenticated) {
    return <PasswordEntry onCorrectPassword={() => setIsAuthenticated(true)} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage("You're in! Watch your inbox for updates.");
        setEmail('');
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <div className="h-full w-full relative">
      {/* White background */}
      <div 
        className="fixed inset-0 bg-background"
        style={{ 
          width: '100vw',
          height: '100vh',
          zIndex: -2
        }}
      />
      {/* Background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-90"
        style={{ 
          backgroundImage: 'url("/shutterstock_1108298168-scaled-1.jpg")',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          filter: 'contrast(0.7) brightness(1.2)',
          maskImage: 'linear-gradient(to bottom, rgb(255, 255, 255) 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgb(255, 255, 255) 30%, transparent 100%)'
        }}
      />
      
      {/* Background Animation */}
      <BackgroundAnimation />

      {/* Content Layer - everything inside this div will be above the animation */}
      <div className="relative z-[1]">
        {/* Small banner at the very top */}
        <div className="relative w-full">
          <div className="flex justify-center w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
              }} />
              <div className="relative backdrop-blur-sm border-ink/10">
                <div className="px-12 py-2 text-center text-xs font-['Berkeley_Mono']">
                  <span className="text-ink/70">Presented by</span>{' '}
                  <img src="/CampusLogo.png" alt="Campus" className="h-4 inline-block" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={`min-h-screen w-full font-serif`}>
          {/* Grain overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="grain" aria-hidden="true" />
          </div>
          
          {/* Content container */}
          <div className="relative w-full">
            <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-ink/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-ink" />
                  <span className="text-xs sm:text-sm text-ink font-['Berkeley_Mono'] tracking-tight">Brooklyn • 2025</span>
                </div>
                
                <h1 className="text-6xl sm:text-7xl lg:text-9xl font-light tracking-tight text-ink italic mb-1">
                  HandsOn
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-light text-ink">
                  A Festival for Human Agency
                </p>

                <div className="pt-6 sm:pt-8">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl bg-background/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-ink/10">
                    <div className="flex-1">
                      <input
                        type="email"
                        placeholder="Enter your email for updates"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 border border-ink/20 rounded-xl text-ink placeholder-ink/50 focus:outline-none focus:ring-2 focus:ring-ink/20 text-sm sm:text-base font-['Berkeley_Mono']"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-ink hover:bg-ink/90 text-background rounded-xl font-['Berkeley_Mono'] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base group"
                    >
                      {status === 'loading' ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>Stay Updated</span>
                          <ArrowRight className="w-4 h-4 group-hover:animate-[bounce-right_1s_ease-in-out_infinite]" />
                        </>
                      )}
                    </button>

                  {status === 'success' && (
                    <div className="mt-3 sm:mt-4 flex items-center space-x-2 text-ink text-sm sm:text-base font-['Berkeley_Mono']">
                      <Check className="w-4 h-4" />
                      <span>{message}</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mt-3 sm:mt-4 flex items-center space-x-2 text-ink text-sm sm:text-base font-['Berkeley_Mono']">
                      <AlertCircle className="w-4 h-4" />
                      <span>{message}</span>
                    </div>
                  )}
                  </form>
                </div>
              </div>
            </div>

          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl text-ink mb-4">
                How might we expand human agency?
              </h3>
              <p className="text-lg sm:text-xl text-ink leading-relaxed">
                Human progress depends on the expansion of individual and collective agency. HandsOn is a learning environment where interdisciplinary thinkers convene to learn by doing. Through intensive workshops and hands-on projects, practitioners from diverse disciplines will collaborate, experiment, and build together. Like a Montessori school for leading professionals, participants will engage directly with tools and ideas—coding alongside designers, prototyping with psychologists, and exploring new models of coordination with governance researchers. This is a space where boundaries between fields dissolve and new possibilities emerge through practical, experiential learning.
              </p>
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="border-t border-ink/10 bg-background">
            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-ink">Supported By</h2>
                <div className="grid grid-cols-3 gap-8 items-center justify-center max-w-2xl mx-auto">
                <div className="text-center">
                    The Service Guild
                  </div>
                  <div className="text-center">
                    <a href="https://www.buildexante.com/" className="block">
                      <img src="/exantelogo.png" alt="Ex/Ante" className="h-6 mx-auto" />
                    </a>
                  </div>
                  <div className="text-center">
                    <a href="https://n0.computer/" className="block">
                      <img src="https://n0.computer/img/logos/wordmark-small-gray.svg" alt="N0.Computer" className="h-6 mx-auto" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Footer */}
            <footer className="relative border-t border-ink/10 bg-background/80 backdrop-blur-sm">
              <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-sm text-ink font-['Berkeley_Mono']">© 2024 HandsOn Festival</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-ink font-['Berkeley_Mono']">Presented by</span>
                  <img src="/CampusLogo.png" alt="Campus" className="h-4 inline-block" />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;