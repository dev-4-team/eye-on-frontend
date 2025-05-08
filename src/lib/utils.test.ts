import { formatDate } from '@/lib/utils';

describe('testing formatDate', () => {
  test('correctly return monday', () => {
    const testDate = new Date(2025, 5, 2).toISOString();
    expect(formatDate(testDate)).toEqual('6월 2일 월요일 0시 0분');
  });
  test('correctly return tuesday', () => {
    const testDate = new Date(2025, 5, 3).toISOString();
    expect(formatDate(testDate)).toEqual('6월 3일 화요일 0시 0분');
  });
  test('correctly return wednesday', () => {
    const testDate = new Date(2025, 5, 4).toISOString();
    expect(formatDate(testDate)).toEqual('6월 4일 수요일 0시 0분');
  });
  test('correctly return thursday', () => {
    const testDate = new Date(2025, 5, 5).toISOString();
    expect(formatDate(testDate)).toEqual('6월 5일 목요일 0시 0분');
  });
  test('correctly return friday', () => {
    const testDate = new Date(2025, 5, 6).toISOString();
    expect(formatDate(testDate)).toEqual('6월 6일 금요일 0시 0분');
  });
  test('correctly return saturday', () => {
    const testDate = new Date(2025, 5, 7).toISOString();
    expect(formatDate(testDate)).toEqual('6월 7일 토요일 0시 0분');
  });
  test('correctly return sunday', () => {
    const testDate = new Date(2025, 5, 8).toISOString();
    expect(formatDate(testDate)).toEqual('6월 8일 일요일 0시 0분');
  });
});
