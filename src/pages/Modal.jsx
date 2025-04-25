import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center" 
    style={{backgroundColor:"#00000080", zIndex:"3"}}>
      <div className="bg-white p-6 rounded-lg relative shadow-lg animate-fadeIn container"
        style={{maxWidth:"750px", minHeight:"75dvh", padding:"2rem"}}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-3xl font-bold px-2 py-1 rounded-full cursor-pointer transition"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
