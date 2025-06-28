import { useEffect, useState, type ReactNode } from 'react';

interface KakaoMapProps {
  latitude?: number;
  longitude?: number;
  markers?: {
    lat: number;
    lng: number;
    label?: string;
    color?: string;
  }[];
  children?: ReactNode;
  showAllMarkers?: boolean; // 새로 추가된 prop
}

declare global {
  interface CustomOverlay {
    setMap(map: KakaoMap | null): void;
  }

  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => LatLng;
        LatLngBounds: new () => LatLngBounds;
        Map: new (
          container: HTMLElement,
          options: { center: LatLng; level: number },
        ) => KakaoMap;
        Marker: new (options: { position: LatLng }) => Marker;
        InfoWindow: new (options: {
          content: string;
          disableAutoPan?: boolean;
          removable?: boolean;
        }) => InfoWindow;
        CustomOverlay: new (options: {
          position: LatLng;
          content: string;
          yAnchor?: number;
        }) => CustomOverlay;
      };
    };
  }

  interface LatLng {
    getLat(): number;
    getLng(): number;
  }

  interface LatLngBounds {
    extend(latlng: LatLng): void;
    isEmpty(): boolean;
  }

  interface KakaoMap {
    setBounds(bounds: LatLngBounds): void;
  }

  interface Marker {
    setMap(map: KakaoMap): void;
  }

  interface InfoWindow {
    open(map: KakaoMap, marker: Marker): void;
  }
}

const KakaoMap = ({
  latitude,
  longitude,
  markers,
  children,
  showAllMarkers = false,
}: KakaoMapProps) => {
  const [isMapReady, setIsMapReady] = useState(false);
  
  const initializeMap = (markers?: KakaoMapProps['markers']) => {
    const container = document.getElementById('map');
    if (!container) return;

    const center = new window.kakao.maps.LatLng(latitude, longitude);
    const options = { center: center, level: 4 };
    const map = new window.kakao.maps.Map(container, options);
    setIsMapReady(true);

    // 목적지 마커
    const centerMarker = new window.kakao.maps.Marker({ position: center });
    centerMarker.setMap(map);

    // 모든 마커 위치를 포함할 bounds 생성
    const bounds = new window.kakao.maps.LatLngBounds();
    
    // 중심 좌표도 bounds에 추가
    if (latitude && longitude) {
      bounds.extend(center);
    }

    // 친구들 마커 표시
    markers?.forEach(({ lat, lng, label, color }) => {
      const position = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
      });
      marker.setMap(map);

      // bounds에 마커 위치 추가
      bounds.extend(position);

      if (label) {
        const overlay = new window.kakao.maps.CustomOverlay({
          position,
          content: `
        <div style="
          display: flex;
          align-items: center;
          background: white;
          padding: 6px 10px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          position: relative;
          z-index: 10;
          transform: translateY(-120%);
        ">
          <div style="
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: ${color || '#007bff'};
            margin-right: 6px;
          "></div>
          <span>${label}</span>
        </div>
      `,
          yAnchor: 1,
        });
        overlay.setMap(map);
      }
    });

    // showAllMarkers가 true이고 마커가 있으면 모든 마커가 보이도록 지도 범위 조정
    if (showAllMarkers && markers && markers.length > 0 && !bounds.isEmpty()) {
      map.setBounds(bounds);
    }
  };

  useEffect(() => {
    if (!latitude || !longitude) return;
    
    // 이미 로드된 경우 바로 초기화
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => {
        initializeMap(markers);
      });
      return;
    }

    // 스크립트 동적 추가
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap(markers);
      });
    };

    document.head.appendChild(script);
  }, [latitude, longitude, markers, showAllMarkers]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        backgroundColor: isMapReady ? 'transparent' : '#f2f5f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {!isMapReady && (
        <div style={{ textAlign: 'center', color: '#555' }}>
          <div style={{ fontSize: '20px', fontWeight: 600 }}>🗺 지도</div>
          <div style={{ marginTop: '4px', fontSize: '14px' }}>
            목적지를 선택해주세요.
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default KakaoMap;