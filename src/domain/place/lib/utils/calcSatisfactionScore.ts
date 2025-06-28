export const calcSatisfactionScore = (
  avgTime: number,
  avgTransfers: number,
  timeWeight = 1,
  transferWeight = 1,
): number => {
  // 점수는 5점 만점에서 시간과 환승에 비례해 감점
  return 5 - avgTime / (10 * timeWeight) - avgTransfers * transferWeight;
};
