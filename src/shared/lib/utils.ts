import subway from '../../app/data/subway.json';

export const getSubwayInfoList = () => {
  const subwayInfoList = subway.DATA.map((item) => {
    return {
      code: item.station_cd,
      name: item.station_nm,
      line: item.line_num,
    };
  });

  return subwayInfoList;
};
