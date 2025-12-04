import { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { BookingSection } from './components/BookingSection';
import { FAQ } from './components/FAQ';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [view, setView] = useState<'home' | 'admin'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Toaster />
      
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white">RT</span>
              </div>
              <span className="text-white text-xl">RaS Techno</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setView('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {view === 'home' ? (
        <>
          <Hero />
          <Features />
          <BookingSection />
          <FAQ />
        </>
      ) : (
        <AdminDashboard />
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/60">
            <p>&copy; 2025 RaS Techno. Empowering businesses with technology and strategy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}