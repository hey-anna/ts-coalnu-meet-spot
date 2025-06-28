export const calcSatisfactionScore = (
  avgTime: number,
  avgTransfers: number,
  timeWeight = 1,
  transferWeight = 0.5,
): number => {
  // 10점 만점 기준: 시간은 1점당 10분, 환승은 기본 0.5점
  return 10 - avgTime / (10 * timeWeight) - avgTransfers * transferWeight;
};
