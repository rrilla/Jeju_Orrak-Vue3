import type { Orum, OrumDataset, Season } from '~/types/orum';

import raw from '~/data/jeju_orum.json' assert { type: 'json' };

type SortKey = 'name' | 'duration'; // duration = (summit|course) 중 최소 편도시간
type Order = 'asc' | 'desc';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const q = (query.q as string)?.trim().toLowerCase() || '';
  const difficulty = (query.difficulty as string) || ''; // 예: '하' | '중' | '상'
  const season = (query.season as Season) || ''; // '봄' | '여름' | '가을' | '겨울'
  const parking = (query.parking as string) || ''; // 'true' | 'false' | ''
  const maxDuration = Number(query.maxDuration || 0); // 분(편도) 상한
  const sort = ((query.sort as string) || 'name') as SortKey;
  const order = ((query.order as string) || 'asc') as Order;

  let list = (raw as OrumDataset) ?? [];

  // 텍스트 검색: 이름, 설명, 특징/주의/추천/특이사항, 명칭유래 등 폭넓게
  if (q) {
    list = list.filter((o) => {
      const hay = [
        o.name,
        o.description,
        o.entrance?.main,
        o.entrance?.address,
        o.difficulty,
        ...(o.features ?? []),
        ...(o.cautions ?? []),
        ...(o.tips ?? []),
        ...(o.notes ?? []),
        ...(o.name_origin ?? []),
        ...(o.parking?.parking ?? []),
        ...(o.usage_and_fees?.hours_and_fees ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }

  // 난이도 필터(정확 일치)
  if (difficulty) {
    list = list.filter((o) => (o.difficulty ?? '') === difficulty);
  }

  // 추천시기 포함 여부
  if (season) {
    list = list.filter((o) => Array.isArray(o.seasons) && o.seasons.includes(season));
  }

  // 주차 가능 여부
  if (parking === 'true') list = list.filter((o) => o.parking?.has_parking === true);
  if (parking === 'false') list = list.filter((o) => o.parking?.has_parking === false);

  // 편도 소요시간 상한 (summit/course 중 존재하는 값의 "최소"로 비교)
  const getMinOneWay = (o: Orum) => {
    const s = o.duration_minutes_one_way?.summit;
    const c = o.duration_minutes_one_way?.course;
    if (typeof s === 'number' && typeof c === 'number') return Math.min(s, c);
    if (typeof s === 'number') return s;
    if (typeof c === 'number') return c;
    return undefined;
  };
  if (maxDuration > 0) {
    list = list.filter((o) => {
      const m = getMinOneWay(o);
      return typeof m === 'number' && m <= maxDuration;
    });
  }

  // 정렬
  list = [...list].sort((a, b) => {
    let res = 0;
    if (sort === 'duration') {
      const am = getMinOneWay(a);
      const bm = getMinOneWay(b);
      const av = typeof am === 'number' ? am : Number.POSITIVE_INFINITY;
      const bv = typeof bm === 'number' ? bm : Number.POSITIVE_INFINITY;
      res = av - bv;
    } else {
      res = (a.name ?? '').localeCompare(b.name ?? '', 'ko');
    }
    return order === 'desc' ? -res : res;
  });

  return { total: list.length, items: list };
});
