const baseUrl = 'https://api.jikan.moe/v4/characters';
export const getCharacters = async (query?: string, limit = 10, page = 1) => {
  const url = query
    ? `${baseUrl}?limit=${limit}&page=${page}&q=${query}`
    : `${baseUrl}?limit=${limit}&page=${page}`;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const getCharacterById = async (id: number) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
