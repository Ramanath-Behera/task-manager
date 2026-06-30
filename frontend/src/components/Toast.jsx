import { useEffect } from 'react';

// simple toast notification that auto-hides after 3 seconds
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
}

export default Toast;
