import type { Orum, Season } from '~/types/orum';

export interface OrumQuery {
  q?: string;
  difficulty?: string;
  season?: Season | '';
  parking?: '' | 'true' | 'false';
  maxDuration?: number;
  sort?: 'name' | 'duration';
  order?: 'asc' | 'desc';
}

export function useOrums(initial?: OrumQuery) {
  const query = ref<OrumQuery>({
    q: '',
    difficulty: '',
    season: '',
    parking: '',
    maxDuration: undefined,
    sort: 'name',
    order: 'asc',
    ...(initial || {}),
  });

  const { data, pending, error, refresh } = useFetch<{ total: number; items: Orum[] }>(
    '/api/orums',
    {
      query,
      default: () => ({ total: 0, items: [] }),
      watch: [query],
    }
  );

  return { query, data, pending, error, refresh };
}
