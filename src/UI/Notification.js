import React, { useState, createContext, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      ...toast,
      duration: toast.duration || 5000
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ type: 'error', message, duration: 0, ...options });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ type: 'warning', message, ...options });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);

  const typeStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: '✅',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: '❌',
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: '⚠️',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'ℹ️',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    }
  };

  const style = typeStyles[toast.type] || typeStyles.info;

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out max-w-sm w-full
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`
        ${style.bg} border rounded-lg shadow-lg p-4 mb-3
      `}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${style.iconColor} text-lg mr-3`}>
            {style.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            {toast.title && (
              <p className={`text-sm font-medium ${style.textColor} mb-1`}>
                {toast.title}
              </p>
            )}
            <p className={`text-sm ${style.textColor}`}>
              {toast.message}
            </p>
            {toast.action && (
              <div className="mt-2">
                <button
                  onClick={toast.action.onClick}
                  className={`text-xs font-medium ${style.iconColor} hover:underline`}
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleRemove}
              className={`
                inline-flex rounded-md p-1.5 ${style.iconColor} 
                hover:bg-white hover:bg-opacity-75 focus:outline-none
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Progress bar for timed toasts */}
        {toast.duration > 0 && (
          <div className="mt-2 w-full bg-white bg-opacity-50 rounded-full h-1">
            <div 
              className={`${style.iconColor.replace('text-', 'bg-')} h-1 rounded-full transition-all duration-linear`}
              style={{
                animation: `shrink ${toast.duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>,
    document.body
  );
};

// Add CSS for progress bar animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
document.head.appendChild(style);

export default Toast;