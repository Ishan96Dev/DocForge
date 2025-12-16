import axios from 'axios';
import { AnalyzeResponse, CrawlRequest, CrawlResponse, JobStatusResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeUrl = async (url: string): Promise<AnalyzeResponse> => {
  const response = await api.post<AnalyzeResponse>('/api/analyze', { url, check_sitemap: true });
  return response.data;
};

export const startCrawl = async (request: CrawlRequest): Promise<CrawlResponse> => {
  const response = await api.post<CrawlResponse>('/api/crawl', request);
  return response.data;
};

export const getJobStatus = async (jobId: string): Promise<JobStatusResponse> => {
  const response = await api.get<JobStatusResponse>(`/api/job/${jobId}`);
  return response.data;
};

export const downloadPDF = (jobId: string): string => {
  return `${API_URL}/api/download/${jobId}`;
};

export const previewPDF = (jobId: string): string => {
  return `${API_URL}/api/preview/${jobId}`;
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health', { timeout: 3000 });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
