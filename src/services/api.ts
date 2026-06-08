import axios from 'axios';

const BASE_URL = 'https://overfast-api.tekrop.fr';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export const searchPlayers = async (query: string) => {
  const { data } = await api.get(`/players?name=${encodeURIComponent(query)}&limit=10`);
  return data;
};

export const getPlayerSummary = async (playerId: string) => {
  const { data } = await api.get(`/players/${encodeURIComponent(playerId)}/summary`);
  return data;
};

export const getPlayerStats = async (playerId: string, gamemode: 'competitive' | 'quickplay' = 'competitive') => {
  const { data } = await api.get(`/players/${encodeURIComponent(playerId)}/stats/summary?gamemode=${gamemode}`);
  return data;
};

export const getPlayerCareerStats = async (playerId: string, hero = 'all-heroes') => {
  const { data } = await api.get(
    `/players/${encodeURIComponent(playerId)}/stats/career?hero=${hero}&platform=pc`
  );
  return data;
};

export default api;
