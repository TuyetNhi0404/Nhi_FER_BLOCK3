import { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastCtx = createContext();
export const useToast = () => useContext(ToastCtx);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]); 

  const addToast = useCallback((payload) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, delay: 4500, ...payload }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastCtx.Provider value={{ addToast }}>
      {children}
      <ToastContainer 
        position="top-end" 
        className="p-3"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1050, 
          width: 'auto',
          maxWidth: '350px'
        }}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            bg={t.bg || "dark"}
            onClose={() => removeToast(t.id)}
            delay={t.delay}
            autohide
            className="mb-2" 
          >
            {t.title && (
              <Toast.Header closeButton>
                <strong className="me-auto">{t.title}</strong>
              </Toast.Header>
            )}
            <Toast.Body className="text-white">{t.body}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastCtx.Provider>
  );
};