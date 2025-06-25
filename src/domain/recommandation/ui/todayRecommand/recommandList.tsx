import { useEffect, useState } from 'react';
import places from '../../apis/api';

const recommandList = () => {
  const [count, setCount] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const restaurantData = await places('홍대입구역', '맛집');
        const cafeData = await places('홍대입구역', '카페');

        setRestaurants(restaurantData);
        setCafes(cafeData);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);
  return (
    <>
      <div>
        <h2>맛집 ({restaurants.length}개)</h2>
        {/* restaurants 데이터 렌더링 */}

        <h2>카페 ({cafes.length}개)</h2>
      </div>
    </>
  );
};

export default recommandList;
