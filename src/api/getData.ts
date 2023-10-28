const baseUrl = 'https://swapi.dev/api/';

export const getPeople = async () => {
  const response = await fetch(`${baseUrl}people/`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const findCharacter = async (name: string) => {
  const response = await fetch(`${baseUrl}people/?search=${name}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

// ?page=2
