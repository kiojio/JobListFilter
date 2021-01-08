import { apiClient } from 'helpers/api';

export const jobs = params => apiClient
  .get(`https://jobs.github.com/positions.json?/${params}`);