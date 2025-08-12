"use client"

export const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center space-y-8">
    <div className="w-64 h-0.5 bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full bg-white rounded-full animate-loading-line"></div>
    </div>
    <span className="text-gray-400 text-sm">Loading days...</span>
    <style jsx>{`
      @keyframes loading-line {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      .animate-loading-line {
        animation: loading-line 2s ease-in-out infinite;
      }
    `}</style>
  </div>
)
