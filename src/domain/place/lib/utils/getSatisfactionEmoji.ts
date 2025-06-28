import { calcSatisfactionScore } from './calcSatisfactionScore';

// 평균 이동 시간(분), 평균 환승 횟수 기반 만족도 평가 (10점 만점 기준)
export const getSatisfactionEmoji = (
  avgTime: number | null,
  avgTransfers: number | null,
): string => {
  if (avgTime === null || avgTransfers === null) return '-';

  // 예: 5점 만점에서 시간/환승 페널티를 반영
  // const score = 5 - avgTime / 10 - avgTransfers;
  const score = calcSatisfactionScore(avgTime, avgTransfers, 1, 0.5); // 기본: 10분당 1점, 환승 1회당 0.5점 감점

  if (score >= 9) return '😄'; // 매우 만족
  if (score >= 7) return '🙂'; // 만족
  if (score >= 5) return '😐'; // 보통
  if (score >= 3) return '😕'; // 불편
  return '😣'; // 매우 불편
};
