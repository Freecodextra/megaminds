import React from "react";

function LoadingSpinner({ className = "" }) {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;