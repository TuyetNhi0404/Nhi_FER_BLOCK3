import React, { createContext, useContext, useReducer } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            id: Date.now(),
            message: action.payload.message,
            type: action.payload.type || 'success',
            show: true
          }
        ]
      };

    case 'HIDE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };

    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: []
      };

    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const showToast = (message, type = 'success') => {
    dispatch({ 
      type: 'SHOW_TOAST', 
      payload: { message, type } 
    });
  };

  const hideToast = (toastId) => {
    dispatch({ type: 'HIDE_TOAST', payload: toastId });
  };

  const clearToasts = () => {
    dispatch({ type: 'CLEAR_TOASTS' });
  };

  return (
    <ToastContext.Provider value={{
      toasts: state.toasts,
      showToast,
      hideToast,
      clearToasts
    }}>
      {children}
    </ToastContext.Provider>
  );
};