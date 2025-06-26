export interface SubwayPathResult {
  globalStartName: string;
  globalEndName: string;
  globalTravelTime: number;
  globalDistance: number;
  globalStationCount: number;
  fare: number;
  cashFare: number;
  driveInfoSet: {
    driveInfo: SubwayPathDriveInfo[];
  };
  exChangeInfoSet?: {
    exChangeInfo: SubwayPathExChangeInfo[];
  };
  stationSet: {
    stations: SubwayPathStationInfo[];
  };
}

export interface SubwayPathDriveInfo {
  laneID: string;
  laneName: string;
  startName: string;
  stationCount: number;
  wayCode: number;
  wayName: string;
}

export interface SubwayPathExChangeInfo {
  laneName: string;
  startName: string;
  exName: string;
  exSID: number;
  fastTrain: number;
  fastDoor: number;
  exWalkTime: number;
}

export interface SubwayPathStationInfo {
  startID: number;
  startName: string;
  endSID: number;
  endName: string;
  travelTime: number;
}

export interface StationSubwaySearchResult {
  stationID: number;
  stationName: string;
  x: number;
  y: number;
  laneName: string;
  laneCity: string;
  stationClass: number; // 2: 지하철역
}
