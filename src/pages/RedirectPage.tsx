import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOriginalUrl } from '@/services/urlService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, AlertCircle } from 'lucide-react';

const RedirectPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortCode) {
        setError('Invalid short code');
        setLoading(false);
        return;
      }

      try {
        const originalUrl = await getOriginalUrl(shortCode);
        
        if (originalUrl) {
          // Add a small delay to show the redirect page briefly
          setTimeout(() => {
            window.location.href = originalUrl;
          }, 1000);
        } else {
          setError('URL not found or has been deleted');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to redirect. Please check the URL.');
        setLoading(false);
      }
    };

    handleRedirect();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <LoadingSpinner />
            <h2 className="text-xl font-semibold mt-4 mb-2">Redirecting...</h2>
            <p className="text-gray-600">
              Please wait while we redirect you to your destination.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Redirect Failed
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <a
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Return to Homepage
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedirectPage;