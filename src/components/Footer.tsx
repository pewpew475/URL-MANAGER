import React from 'react';
import { LinkIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <LinkIcon className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">URLShort</span>
          </div>
          <p className="text-sm text-gray-600 text-center">
            A simple and fast URL shortening service
          </p>
          <div className="flex items-center space-x-6 text-xs text-gray-500">
            <span>© 2024 URLShort</span>
            <span>•</span>
            <span>Built with React & Firebase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};