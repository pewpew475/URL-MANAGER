import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { URLData } from '@/types';
import { ExternalLink, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface URLTableProps {
  urls: URLData[];
  onDelete: (shortCode: string) => void;
}

export const URLTable: React.FC<URLTableProps> = ({ urls, onDelete }) => {
  const handleCopy = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success('URL copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  const handleVisit = (originalUrl: string) => {
    window.open(originalUrl, '_blank');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (urls.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No URLs found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Management</CardTitle>
        <CardDescription>
          Manage and monitor your shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {urls.map((url) => (
            <div key={url.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Short URL: 
                      <span className="ml-2 text-blue-600 font-mono">
                        {window.location.origin}/{url.shortCode}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      Original: {url.originalUrl}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Created: {formatDate(url.createdAt)}</span>
                    <span>•</span>
                    <span>Visits: {url.visitCount}</span>
                    {url.lastVisited && (
                      <>
                        <span>•</span>
                        <span>Last visited: {formatDate(url.lastVisited)}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant={url.isActive ? 'default' : 'secondary'}>
                    {url.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(`${window.location.origin}/${url.shortCode}`)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVisit(url.originalUrl)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(url.shortCode)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};