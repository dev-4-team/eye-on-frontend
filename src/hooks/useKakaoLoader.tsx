import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loading, error]: [boolean, any] = useKakaoLoaderOrigin({
    appkey: KAKAO_API_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  return [loading, error];
}
