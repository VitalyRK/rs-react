import { HttpResponse, http } from 'msw';

import { detailData, charactersData } from './characters-data';

export const handlers = [
  http.get(/\/character$/, () => {
    return HttpResponse.json(charactersData, {
      headers: { 'x-total-count': '3' },
      status: 200,
    });
  }),
  http.get(/\/character\/8/, () => {
    return HttpResponse.json(detailData, { headers: {}, status: 200 });
  }),
  http.get(/rickandmortyapi\.com/, () => {
    console.error('IMAGE CDN');

    return new HttpResponse(null, { status: 404 });
  }),
];
