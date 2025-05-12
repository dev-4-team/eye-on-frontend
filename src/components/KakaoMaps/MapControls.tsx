import CurrentLocationButton from '@/components/Button/CurrentLocationButton';
import CurrentLocationRestButton from '@/components/Button/CurrentLocationRestButton';

interface Props {
  onLocationCurrent: () => void;
  onLocationReset: () => void;
  isLoadingCurrentLocation: boolean;
}

const CurrentLocationControls = ({
  onLocationCurrent,
  onLocationReset,
  isLoadingCurrentLocation,
}: Props) => {
  return (
    <>
      <CurrentLocationButton onClick={onLocationCurrent} isLoading={isLoadingCurrentLocation} />
      <CurrentLocationRestButton onClick={onLocationReset} />
    </>
  );
};

export default CurrentLocationControls;
