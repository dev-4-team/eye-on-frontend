import { formatDate } from '@/lib/utils';

describe('formatDate toEqual test', () => {
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

describe('formatDate correctly contain day of week test', () => {
  test('return correctly contain monday', () => {
    const testDate = new Date(2025, 5, 2).toISOString();
    expect(formatDate(testDate)).toMatch('월요일');
  });
  test('return correctly contain tuesday', () => {
    const testDate = new Date(2025, 5, 3).toISOString();
    expect(formatDate(testDate)).toMatch('화요일');
  });
  test('return correctly contain wednesday', () => {
    const testDate = new Date(2025, 5, 4).toISOString();
    expect(formatDate(testDate)).toMatch('수요일');
  });
  test('return correctly contain thursday', () => {
    const testDate = new Date(2025, 5, 5).toISOString();
    expect(formatDate(testDate)).toMatch('목요일');
  });
  test('return correctly contain friday', () => {
    const testDate = new Date(2025, 5, 6).toISOString();
    expect(formatDate(testDate)).toMatch('금요일');
  });
  test('return correctly contain saturday', () => {
    const testDate = new Date(2025, 5, 7).toISOString();
    expect(formatDate(testDate)).toMatch('토요일');
  });
  test('return correctly contain sunday', () => {
    const testDate = new Date(2025, 5, 8).toISOString();
    expect(formatDate(testDate)).toMatch('일요일');
  });
});

describe('exception test', () => {
  test('', () => {
    const testDate = '';
    expect(formatDate(testDate)).toMatch('월요일');
  });
});
