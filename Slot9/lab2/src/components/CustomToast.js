import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomToast = ({ show, message, variant, onClose }) => {
  return (
    <ToastContainer className="position-fixed bottom-0 end-0 m-3">
      <Toast 
        show={show} 
        onClose={onClose} 
        delay={3000} 
        autohide
        className={variant === 'success' ? 'toast-custom' : 'bg-warning'}
      >
        <Toast.Header>
          <strong className="me-auto">
            {variant === 'success' ? '✅ Success' : '⚠️ Notice'}
          </strong>
        </Toast.Header>
        <Toast.Body className={variant === 'success' ? 'text-white' : 'text-dark'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

CustomToast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CustomToast;