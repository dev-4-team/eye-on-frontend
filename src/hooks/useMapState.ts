import { useState } from 'react';

interface Props {
  mapInstance: kakao.maps.Map | null;
}

export const useMapState = ({ mapInstance }: Props) => {
  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(0);
  const [isMapDragging, setIsMapDragging] = useState(false);

  const handleDragStart = () => {
    if (!mapInstance) return null;
    setIsMapDragging(true);
  };

  const handleDragEnd = () => {
    if (!mapInstance) return null;
    setIsMapDragging(false);
  };

  const handleZoomChange = (map: kakao.maps.Map) => {
    if (!mapInstance) return null;
    setCurrentZoomLevel(map.getLevel());
  };

  return { currentZoomLevel, isMapDragging, handleDragStart, handleDragEnd, handleZoomChange };
};
