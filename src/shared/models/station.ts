export interface StationData {
  line_num: string;
  station_cd: string;
  station_nm: string;
  fr_code: string;
}

export interface StationResponse {
  DESCRIPTION: {
    STATION_NM: string;
    STATION_CD: string;
    LINE_NUM: string;
    FR_CODE: string;
  };
  DATA: StationData[];
}