import { useEffect } from 'react';
import { useStationInfoQuery } from '../../domain/place/hooks/useStationInfoQuery';
import { getDistanceInMeters } from '../../domain/place/lib/geo';
import { useStationDistanceQuery } from '../../domain/place/hooks/useStationDistanceQuery';

const StationTestPage = () => {
  const {
    data: stationInfoData,
    isLoading,
    error,
  } = useStationInfoQuery('강남');
  const { data: distanceInfoData } = useStationDistanceQuery('02호선', '강남');

  // 사용자 임의 위치
  const myLocation = { lat: 37.5, lon: 127.0 };

  // useEffect(() => {
  //   if (data) {
  //     // console.log('강남역 응답 결과:', data);
  //     console.log('전체 응답:', data);
  //     const station = data?.SearchInfoBySubwayNameService?.row?.[0];
  //     console.log('위도:', station?.YPOINT_WGS);
  //     console.log('경도:', station?.XPOINT_WGS);
  //   }
  // }, [data]);
  useEffect(() => {
    const station = stationInfoData?.SearchInfoBySubwayNameService?.row?.[0];
    const distances = distanceInfoData?.StationDstncReqreTimeHm?.row;

    if (station) {
      console.log('강남역 기본 정보:', station);
    }

    if (distances) {
      console.log('강남역 기준 거리 정보 리스트:', distances);
    }
  }, [stationInfoData, distanceInfoData]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  const row = stationInfoData?.SearchInfoBySubwayNameService?.row?.[0];

  // 거리 계산
  const distance =
    row?.YPOINT_WGS && row?.XPOINT_WGS
      ? getDistanceInMeters(
          myLocation.lat,
          myLocation.lon,
          Number(row.YPOINT_WGS), // 위도
          Number(row.XPOINT_WGS), // 경도
        )
      : null;
  return (
    <div>
      <h2>지하철 역 정보</h2>
      {row ? (
        <>
          <p>역명: {row.STATION_NM}</p>
          <p>호선: {row.LINE_NUM}</p>
          <p>역 코드: {row.STATION_CD}</p>
          <p>외부코드: {row.FR_CODE}</p>
          {distance && <p>나와의 거리: {Math.round(distance)}m</p>}
        </>
      ) : (
        <p>검색 결과 없음</p>
      )}
    </div>
  );
};

export default StationTestPage;
