// 좌표 기반 경로 조회용
export interface SubwayPathParams {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

// stationID 기반 경로 조회용
export interface SubwayPathRequest {
  CID: number;
  SID: number;
  EID: number;
  Sopt?: number;
  output?: 'json' | 'xml';
  lang?: number;
}
