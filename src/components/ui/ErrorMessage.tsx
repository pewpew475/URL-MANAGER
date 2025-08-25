import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
      <AlertCircle size={20} />
      <span>{message}</span>
    </div>
  );
};