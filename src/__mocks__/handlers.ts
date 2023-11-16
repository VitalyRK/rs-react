import { HttpResponse, http } from 'msw';

import { detailData, charactersData } from './characters-data';

export const handlers = [
  http.get(/\/characters$/, () => {
    return HttpResponse.json(charactersData, {
      headers: {},
      status: 200,
    });
  }),
  http.get(/\/characters\/^\d+$/, () => {
    return HttpResponse.json(detailData, { headers: {}, status: 200 });
  }),
];
