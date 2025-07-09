
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-[#007ee5] transition-all duration-500 ease-out"
        style={{
          width: loading ? '100%' : '0%',
          animation: 'progress 500ms ease-out'
        }}
      />
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
