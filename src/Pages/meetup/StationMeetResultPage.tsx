import { useEffect, useState } from 'react';
import { getStationSubwayCoords } from '../../domain/place/apis/stationSubwayApi';
import { getStationSubwayPathByID } from '../../domain/place/apis/stationSubwayApi';
import { useSearchSubwayStationQuery } from '../../domain/place/hooks/useSearchSubwayStationQuery';
import type { StationSubwaySearchResult } from '../../domain/place/models/stationSubwayPath.response';

type StationCoords = {
  name: string;
  x: number;
  y: number;
  stationID: number;
  laneID?: string;
};

const StationTestPage = () => {
  const [keyword, setKeyword] = useState<string>('종각');

  const [results, setResults] = useState<
    { name: string; time: number | null }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const { data: stationList = [] } = useSearchSubwayStationQuery(keyword);
  console.log('stationList', stationList);
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        setError(null);

        const to: StationCoords = await getStationSubwayCoords('서울');

        const friends = [
          { name: '지민', from: '강남' },
          { name: '수아', from: '잠실' },
          { name: '도윤', from: '종각' },
        ];

        const resultList = await Promise.all(
          friends.map(async (friend) => {
            const from: StationCoords = await getStationSubwayCoords(
              friend.from,
            );
            console.log('from:', friend.name, from.stationID);
            console.log('to:', to.stationID);
            const result = await getStationSubwayPathByID({
              startID: from.stationID,
              endID: to.stationID,
            });
            return {
              name: friend.name,
              time: result.globalTravelTime,
            };
          }),
        );

        setResults(resultList);
      } catch (err) {
        console.error('에러 발생:', err);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchTimes();
  }, []);
  useEffect(() => {
    console.log('불러온 역 리스트:', stationList);
  }, [stationList]);
  return (
    <div style={{ padding: '2rem' }}>
      <h2>지하철 경로 테스트</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="지하철역 검색"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results.map((res) => (
        <p key={res.name}>
          <strong>{res.name}</strong>: {res.time ?? '정보 없음'}분
        </p>
      ))}

      <select>
        {stationList?.map((s: StationSubwaySearchResult) => (
          <option key={s.stationID} value={s.stationID}>
            {s.stationName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StationTestPage;
