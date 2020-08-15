const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (key, nextPage = 1) => {
  const res = await fetch(`${BASE_URL}/character/?page=${nextPage}`);
  const { results, info } = await res.json();
  return {
    data: results,
    nextPage: info.next ? nextPage + 1 : null,
  };
};

export const getCharacter = async (key, id) => {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  const data = await res.json();
  return data;
};

export const getEpisodes = async (key, nextPage = 1) => {
  const res = await fetch(`${BASE_URL}/episode/?page=${nextPage}`);
  const { results, info } = await res.json();
  return {
    data: results,
    nextPage: info.next ? nextPage + 1 : null,
  };
};

export const getEpisode = async (key, id) => {
  const res = await fetch(`${BASE_URL}/episode/${id}`);
  const data = await res.json();
  return data;
};

export const getLocations = async (key, nextPage = 1) => {
  const res = await fetch(`${BASE_URL}/location/?page=${nextPage}`);
  const { results, info } = await res.json();
  return {
    data: results,
    nextPage: info.next ? nextPage + 1 : null,
  };
};
