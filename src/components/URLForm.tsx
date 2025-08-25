import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { shortenUrl } from '@/services/urlService';
import { URLResult } from './URLResult';
import { ErrorMessage } from './ui/ErrorMessage';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ShortenUrlResponse } from '@/types';
import { LinkIcon } from 'lucide-react';

export const URLForm: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [result, setResult] = useState<ShortenUrlResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await shortenUrl(originalUrl);
      setResult(response);
      setOriginalUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setOriginalUrl('');
  };

  if (result) {
    return (
      <URLResult 
        result={result} 
        onCreateAnother={handleReset}
      />
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <LinkIcon className="h-6 w-6 text-blue-600" />
          <span>Shorten Your URL</span>
        </CardTitle>
        <CardDescription>
          Enter a long URL below and get a shortened version instantly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Long URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="text-base"
            />
          </div>

          {error && <ErrorMessage message={error} />}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !originalUrl.trim()}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Shortening...</span>
              </>
            ) : (
              'Shorten URL'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};