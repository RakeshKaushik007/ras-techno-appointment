import { Calendar, Users, Zap } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                🚀 Limited Slots Available
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white max-w-4xl mx-auto">
              Empowering Businesses with{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Free Consultancy
              </span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              RaS Techno opens its doors for exclusive business consultancy sessions twice every month. 
              Get expert guidance on technology and strategy.
            </p>
          </div>

          {/* Special Offer Box */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl text-white mb-6">✨ Special Offer</h2>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-white/90">First 20 Clients</div>
                  <div className="text-white/60">Get consultancy absolutely free</div>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-white/90">Two Saturdays</div>
                  <div className="text-white/60">Scheduled every month</div>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="text-white/90">First-Come Basis</div>
                  <div className="text-white/60">Slots fill up fast</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Reserve Your Slot Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
