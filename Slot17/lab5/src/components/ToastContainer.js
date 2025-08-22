import React, { useEffect } from 'react';
import { ToastContainer as BSToastContainer, Toast } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const ToastContainer = () => {
  const { toasts, hideToast } = useToast();
  const { colors } = useTheme();

  useEffect(() => {
    toasts.forEach(toast => {
      const timer = setTimeout(() => {
        hideToast(toast.id);
      }, 5000);
      return () => clearTimeout(timer);
    });
  }, [toasts, hideToast]);

  const getToastBg = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'success';
    }
  };

  return (
    <BSToastContainer
      position="top-end"
      className="p-3"
      style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          bg={getToastBg(toast.type)}
          onClose={() => hideToast(toast.id)}
          show={toast.show}
          autohide={false}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      ))}
    </BSToastContainer>
  );
};

export default ToastContainer;
