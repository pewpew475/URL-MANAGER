import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShortenUrlResponse } from '@/types';
import { Copy, Check, ExternalLink, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface URLResultProps {
  result: ShortenUrlResponse;
  onCreateAnother: () => void;
}

export const URLResult: React.FC<URLResultProps> = ({ result, onCreateAnother }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      toast.success('Short URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  const handleVisit = () => {
    window.open(result.shortUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-green-600">URL Shortened Successfully!</CardTitle>
        <CardDescription>
          Your shortened URL is ready to use
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original">Original URL</Label>
            <Input
              id="original"
              value={result.originalUrl}
              readOnly
              className="bg-gray-50 text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortened">Shortened URL</Label>
            <div className="flex space-x-2">
              <Input
                id="shortened"
                value={result.shortUrl}
                readOnly
                className="bg-blue-50 text-blue-700 font-medium"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleVisit}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={onCreateAnother} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Another Short URL
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};