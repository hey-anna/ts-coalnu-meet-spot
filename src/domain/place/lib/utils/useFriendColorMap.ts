import { useMemo } from 'react';

const COLORS = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0'];

export const useFriendColorMap = (
  friendCoords: { name: string }[],
): Record<string, string> => {
  return useMemo(() => {
    const map: Record<string, string> = {};
    friendCoords.forEach((friend, index) => {
      map[friend.name] = COLORS[index % COLORS.length];
    });
    return map;
  }, [friendCoords]);
};
