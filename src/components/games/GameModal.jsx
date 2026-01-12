import { X } from "@/icons";
import { useEffect } from "react";

const GameModal = ({ isOpen, onClose, children, title }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-background border border-primary/30 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-primary/20 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Game Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameModal;