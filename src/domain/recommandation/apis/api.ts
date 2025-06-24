const places = async (location: string, keyword: string = '맛집') => {
  try {
    const response = await fetch(
      `/.netlify/functions/searchPlaces?location=${encodeURIComponent(location)}&keyword=${encodeURIComponent(keyword)}`,
    );

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error('장소 검색 실패:', error);
    return [];
  }
};

export default places;
