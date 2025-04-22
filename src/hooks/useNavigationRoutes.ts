import { Protest } from '@/types/protest';
import { useEffect, useState } from 'react';
import { RouteData } from '@/types/naverRoute';

interface Props {
  protests: Protest[];
}

export const useNavigationRoutes = ({ protests }: Props) => {
  const [routesData, setRoutesData] = useState<RouteData[] | null>(null);
  const fetchRoute = async (start: string, goal: string, waypoints?: string) => {
    const url = new URL(`/next-api/directions/route`, window.location.origin);
    url.searchParams.append('start', start);
    url.searchParams.append('goal', goal);

    if (waypoints) {
      url.searchParams.append('waypoints', waypoints);
    }
    try {
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.code === 0) {
        return data.route ? data.route.trafast[0].path : [];
      }
      if (data.code === 1) {
        return [];
      }
    } catch (e) {
      return [];
    }
  };

  const fetchMultipleRoutes = async (protests: Protest[]) => {
    const results = await Promise.all(
      protests
        .filter(({ locations }) => locations.length >= 2)
        .map(({ locations }) => {
          const start = `${locations[0].longitude},${locations[0].latitude}`;
          const goal = `${locations[locations.length - 1].longitude},${
            locations[locations.length - 1].latitude
          }`;
          const waypoints =
            Array.from(
              new Set(locations.slice(1, -1).map(loc => `${loc.longitude},${loc.latitude}`)),
            ).join('|') || undefined;
          return fetchRoute(start, goal, waypoints);
        }),
    );
    return results;
  };

  const handleFetchRoutes = async () => {
    const routes = await fetchMultipleRoutes(protests);
    setRoutesData(routes);
  };

  useEffect(() => {
    handleFetchRoutes();
  }, [protests]);
  return { routesData };
};
