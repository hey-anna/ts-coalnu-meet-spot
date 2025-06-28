import { create } from 'zustand';
import type { ReactNode } from 'react';

interface PlaceData {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  category?: string;
}

interface SidebarData {
  selectedPlace?: PlaceData;
  restaurants?: any[];
  cafes?: any[];
  isLoadingRestaurants?: boolean;
  isLoadingCafes?: boolean;
  searchRadius?: number;
  // TodayRecommend 관련 데이터 추가
  stationName?: string;
  showHeader?: boolean;
  [key: string]: any;
}

interface SidebarStore {
  // UI 상태
  sidebarContent: ReactNode | null;
  
  // 데이터 상태  
  data: SidebarData;
  
  // Actions
  setSidebarContent: (content: ReactNode | null) => void;
  setData: (data: SidebarData) => void;
  updateData: (updates: Partial<SidebarData>) => void;
  reset: () => void;
  
  // 장소 관련 액션들
  setSelectedPlace: (place: PlaceData) => void;
  setRestaurants: (restaurants: any[]) => void;
  setCafes: (cafes: any[]) => void;
  setLoadingRestaurants: (loading: boolean) => void;
  setLoadingCafes: (loading: boolean) => void;
  
  // TodayRecommend 관련 액션들 추가
  setStationRecommend: (stationName: string, showHeader?: boolean) => void;
  clearStationRecommend: () => void;
}

export const RecommendSideBar = create<SidebarStore>((set, get) => ({
  // 초기 상태
  sidebarContent: null,
  data: {},

  // 기본 액션들
  setSidebarContent: (content) => set({ sidebarContent: content }),
  
  setData: (data) => set({ data }),
  
  updateData: (updates) => set((state) => ({
    data: { ...state.data, ...updates }
  })),
  
  reset: () => set({ 
    sidebarContent: null, 
    data: {} 
  }),

  // 장소 관련 액션들
  setSelectedPlace: (place) => set((state) => ({
    data: { 
      ...state.data, 
      selectedPlace: place,
      restaurants: [], // 새 장소 선택시 기존 결과 초기화
      cafes: []
    }
  })),
  
  setRestaurants: (restaurants) => set((state) => ({
    data: { ...state.data, restaurants }
  })),
  
  setCafes: (cafes) => set((state) => ({
    data: { ...state.data, cafes }
  })),
  
  setLoadingRestaurants: (loading) => set((state) => ({
    data: { ...state.data, isLoadingRestaurants: loading }
  })),
  
  setLoadingCafes: (loading) => set((state) => ({
    data: { ...state.data, isLoadingCafes: loading }
  })),

  // TodayRecommend 관련 액션들
  setStationRecommend: (stationName, showHeader = false) => set((state) => ({
    data: { 
      ...state.data, 
      stationName,
      showHeader 
    }
  })),
  
  clearStationRecommend: () => set((state) => ({
    data: { 
      ...state.data, 
      stationName: undefined,
      showHeader: undefined 
    }
  })),
}));