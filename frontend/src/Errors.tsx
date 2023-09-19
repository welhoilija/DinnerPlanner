import React, { useEffect } from 'react';
import './Errors.scss';
import { Button } from 'react-bootstrap';

type ErrorMessageProps = {
    message: string;
    onClose?: () => void;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="error-message">
            {message}
            {onClose && <Button className="button" onClick={onClose}>✖</Button>}
        </div>
    );
};

export default ErrorMessage;