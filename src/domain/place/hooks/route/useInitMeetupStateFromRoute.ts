import type { Friend } from '@/domain/user/models/model';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

// 라우트에서 받아온 meetup 상태를 초기화하는 훅
type LocationState<TFriend> = {
  selectedStations?: string[];
  selectedFriends?: TFriend[];
};
export const useInitMeetupStateFromRoute = <TFriend extends Friend>(
  setStations: (stations: string[]) => void,
  setFriends: (friends: TFriend[]) => void,
) => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as LocationState<TFriend>;
    if (state?.selectedStations) {
      setStations(state.selectedStations);
    }
    if (state?.selectedFriends) {
      setFriends(state.selectedFriends);
    }
  }, [location, setStations, setFriends]);
};
