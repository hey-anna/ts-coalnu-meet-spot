export interface StationSubwayPathResult {
  globalStartName: string;
  globalEndName: string;
  globalTravelTime: number;
  globalDistance: number;
  globalStationCount: number;
  fare: number;
  cashFare: number;
  driveInfoSet: {
    driveInfo: StationSubwayPathDriveInfo[];
  };
  exChangeInfoSet?: {
    exChangeInfo: StationSubwayPathExChangeInfo[];
  };
  stationSet: {
    stations: StationSubwayPathStationInfo[];
  };
}

export interface StationSubwayPathDriveInfo {
  laneID: string;
  laneName: string;
  startName: string;
  stationCount: number;
  wayCode: number;
  wayName: string;
}

export interface StationSubwayPathExChangeInfo {
  laneName: string;
  startName: string;
  exName: string;
  exSID: number;
  fastTrain: number;
  fastDoor: number;
  exWalkTime: number;
}

export interface StationSubwayPathStationInfo {
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
