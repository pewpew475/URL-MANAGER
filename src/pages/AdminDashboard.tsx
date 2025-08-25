import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { URLTable } from '@/components/URLTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllUrls, deleteUrl } from '@/services/urlService';
import { URLData } from '@/types';
import { BarChart3, Users, Link, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const [urls, setUrls] = useState<URLData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  const loadUrls = async () => {
    try {
      setLoading(true);
      const urlData = await getAllUrls();
      setUrls(urlData);
      setError('');
    } catch (err) {
      setError('Failed to load URLs');
      console.error('Error loading URLs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const handleDelete = async (shortCode: string) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await deleteUrl(shortCode);
        toast.success('URL deleted successfully');
        await loadUrls(); // Reload the list
      } catch (err) {
        toast.error('Failed to delete URL');
        console.error('Error deleting URL:', err);
      }
    }
  };

  const stats = React.useMemo(() => {
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + url.visitCount, 0);
    const activeUrls = urls.filter(url => url.isActive).length;
    const todayUrls = urls.filter(url => {
      const today = new Date();
      const urlDate = new Date(url.createdAt);
      return urlDate.toDateString() === today.toDateString();
    }).length;

    return {
      totalUrls,
      totalClicks,
      activeUrls,
      todayUrls
    };
  }, [urls]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {user?.email}. Manage your URLs and view analytics.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total URLs</CardTitle>
                <Link className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUrls}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {stats.activeUrls} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClicks}</div>
                <p className="text-xs text-gray-600 mt-1">
                  All time clicks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Created Today</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayUrls}</div>
                <p className="text-xs text-gray-600 mt-1">
                  New URLs today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Status</CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Badge variant="default">Online</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  System operational
                </p>
              </CardContent>
            </Card>
          </div>

          {/* URL Management Table */}
          {loading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <LoadingSpinner />
                <span className="ml-2">Loading URLs...</span>
              </CardContent>
            </Card>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <URLTable urls={urls} onDelete={handleDelete} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;