import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <div className="text-[180px] md:text-[240px] font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 bg-clip-text text-transparent leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[180px] md:text-[240px] font-bold text-gray-800 opacity-20 leading-none">
              404
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>

          {/* Animated Elements */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-violet-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-8 -right-8 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-bounce"></div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-violet-600/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <svg className="w-16 h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.86-6.09 2.28A8.962 8.962 0 0012 21a8.962 8.962 0 006.09-2.28A7.962 7.962 0 0112 15z" />
                </svg>
                <p className="text-gray-300 mb-4">
                  Don't worry, even the best explorers get lost sometimes.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gray-700/50 text-gray-300 rounded-lg font-medium hover:bg-gray-600/50 transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-gray-500 text-sm">
            <p>If you believe this is an error, please contact support.</p>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: Math.random() * 20 + 4,
                height: Math.random() * 20 + 4,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? 'rgba(139, 92, 246, 0.3)' : 
                               i % 3 === 1 ? 'rgba(124, 58, 237, 0.2)' : 'rgba(109, 40, 217, 0.15)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}