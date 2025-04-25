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
    <div className="fixed inset-0 flex items-end justify-center" 
    style={{backgroundColor:"#00000080", zIndex:"3"}}>
      <div className="bg-white p-6 rounded-lg relative shadow-lg animate-fadeIn"
        style={{width:"100dvw"}}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
