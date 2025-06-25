import { SUBWAY_STATIONS } from "../../../shared/config/config";

export const getRandomStation = () => {
  const randomIndex = Math.floor(Math.random() * SUBWAY_STATIONS.length);
  return SUBWAY_STATIONS[randomIndex];
};