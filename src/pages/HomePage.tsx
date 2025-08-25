import React from 'react';
import { URLForm } from '@/components/URLForm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Shorten Your URLs
              <span className="block text-blue-600">Instantly</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform long, unwieldy URLs into short, shareable links. 
              Fast, reliable, and completely free to use.
            </p>
          </div>

          <URLForm />

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Why Choose URLShort?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-blue-600 text-3xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Generate shortened URLs in milliseconds with our optimized infrastructure.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-blue-600 text-3xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Your links are protected with enterprise-grade security and 99.9% uptime.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-blue-600 text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Track Performance</h3>
                <p className="text-gray-600">
                  Monitor click-through rates and analytics with our admin dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;