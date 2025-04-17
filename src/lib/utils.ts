import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
export const targetDate =
  process.env.NODE_ENV === 'development' ? '2025-03-15' : new Date().toISOString().split('T')[0];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weekday = weekdays[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month}월 ${day}일 ${weekday} ${hours}시 ${minutes}분`;
};

export const isDesktopOS = () => {
  if (typeof window === 'undefined') return false;
  return (
    'win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos'.indexOf(
      navigator.platform.toLowerCase(),
    ) >= 0
  );
};

export const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  return isMobile;
};

export const generateColorFromIndex = (index: number): string => {
  const r = (index * 50) % 256;
  const g = (index * 100) % 256;
  const b = (index * 150) % 256;
  return `rgb(${r}, ${g}, ${b})`;
};

export const numberTransfer = (number: number) => {
  if (number < 1000) {
    return number;
  } else if (number < 10000) {
    return `${(number / 1000).toFixed(1)}k`;
  } else {
    return `${(number / 10000).toFixed(1)}M`;
  }
};

export function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let lastCall = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  } as T;
}
