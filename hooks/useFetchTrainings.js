import { useState, useEffect, useCallback } from 'react';

export const useFetchTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'http://192.168.100.17:3000';


  const fetchTrainings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/trainings`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch trainings');
      }
      
      const data = await response.json();
      setTrainings(data);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);
  return { trainings, loading, error, refresh: fetchTrainings };
};