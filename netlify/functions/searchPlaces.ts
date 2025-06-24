exports.handler = async (event, context) => {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // OPTIONS 요청 처리 (프리플라이트)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { location, keyword = '맛집' } = event.queryStringParameters;
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${location} ${keyword}&size=5`,
      {
        headers: {
          'Authorization': `KakaoAK ${process.env.VITE_KAKAO_REST_API_KEY}`
        }
      }
    );

    const data = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data.documents)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'API 호출 실패' })
    };
  }
};