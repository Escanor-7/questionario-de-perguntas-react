import axios from 'axios';

const baseURL = 'https://opentdb.com';

export const api = axios.create({
  baseURL: baseURL
});