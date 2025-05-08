import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
export const targetDate =
  process.env.NODE_ENV === 'development' ? '2025-03-15' : new Date().toISOString().split('T')[0];

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) throw new Error('유효하지 않은 날짜입니다.');
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

export const numberTransfer = (input: number | string): string => {
  if (typeof input == 'string' && input.trim().length === 0)
    throw new Error('유효하지 않은 숫자입니다.');
  if (isNaN(Number(input))) throw new Error('유효하지 않은 숫자입니다.');
  input = Number(input);
  if (input < 1000) return String(input);
  else if (input < 1000000) return `${(input / 1000).toFixed(1)}k`;
  else return `${(input / 1000000).toFixed(1)}M`;
};

export const withSafe = <TArg, TResult>({
  arg,
  callback,
  fallback,
}: {
  arg: TArg;
  callback: (arg: TArg) => TResult;
  fallback: TResult;
}) => {
  try {
    return callback(arg);
  } catch (e) {
    console.error(e);
    return fallback;
  }
};

export const throttle = <T extends (...args: any[]) => void>(fn: T, delay: number): T => {
  let lastCall = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  } as T;
};
