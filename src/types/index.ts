export interface URLData {
  id: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  createdAt: Date;
  lastVisited?: Date;
  isActive: boolean;
  createdBy?: string;
}

export interface AnalyticsData {
  id: string;
  shortCode: string;
  visitTimestamp: Date;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface ShortenUrlRequest {
  originalUrl: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  isAdmin?: boolean;
}