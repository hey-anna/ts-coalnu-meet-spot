// 평균 이동 시간(분), 평균 환승 횟수 기반 만족도 평가
export const getSatisfactionEmoji = (
  avgTime: number | null,
  avgTransfers: number | null,
): string => {
  if (avgTime === null || avgTransfers === null) return '-';

  // 예: 5점 만점에서 시간/환승 페널티를 반영
  const score = 5 - avgTime / 10 - avgTransfers;

  if (score >= 4) return '😄';
  if (score >= 3) return '🙂';
  return '😕';
};
