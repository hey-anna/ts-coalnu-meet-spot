import React from 'react';
import { useSearchParams } from 'react-router';
import RecommendResultInfo from '@/domain/recommendation/ui/recommendResult/recommendResultInfo';

const RecommendPlaceList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || '홍대입구역'; // 기본값 설정

  return <RecommendResultInfo location={location} />;
};

export default RecommendPlaceList;