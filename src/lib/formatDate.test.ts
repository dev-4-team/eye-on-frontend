import { formatDate } from '@/lib/utils';

describe('formatDate toEqual test', () => {
  test('should return correct format for Monday', () => {
    const testDate = new Date(2025, 5, 2).toISOString();
    expect(formatDate(testDate)).toEqual('6월 2일 월요일 0시 0분');
  });
  test('should return correct format for Tuesday', () => {
    const testDate = new Date(2025, 5, 3).toISOString();
    expect(formatDate(testDate)).toEqual('6월 3일 화요일 0시 0분');
  });
  test('should return correct format for Wednesday', () => {
    const testDate = new Date(2025, 5, 4).toISOString();
    expect(formatDate(testDate)).toEqual('6월 4일 수요일 0시 0분');
  });
  test('should return correct format for Thursday', () => {
    const testDate = new Date(2025, 5, 5).toISOString();
    expect(formatDate(testDate)).toEqual('6월 5일 목요일 0시 0분');
  });
  test('should return correct format for Friday', () => {
    const testDate = new Date(2025, 5, 6).toISOString();
    expect(formatDate(testDate)).toEqual('6월 6일 금요일 0시 0분');
  });
  test('should return correct format for Saturday', () => {
    const testDate = new Date(2025, 5, 7).toISOString();
    expect(formatDate(testDate)).toEqual('6월 7일 토요일 0시 0분');
  });
  test('should return correct format for Sunday', () => {
    const testDate = new Date(2025, 5, 8).toISOString();
    expect(formatDate(testDate)).toEqual('6월 8일 일요일 0시 0분');
  });
});

describe('formatDate should contain correct day of week', () => {
  test('should contain "월요일"', () => {
    const testDate = new Date(2025, 5, 2).toISOString();
    expect(formatDate(testDate)).toMatch('월요일');
  });
  test('should contain "화요일"', () => {
    const testDate = new Date(2025, 5, 3).toISOString();
    expect(formatDate(testDate)).toMatch('화요일');
  });
  test('should contain "수요일"', () => {
    const testDate = new Date(2025, 5, 4).toISOString();
    expect(formatDate(testDate)).toMatch('수요일');
  });
  test('should contain "목요일"', () => {
    const testDate = new Date(2025, 5, 5).toISOString();
    expect(formatDate(testDate)).toMatch('목요일');
  });
  test('should contain "금요일"', () => {
    const testDate = new Date(2025, 5, 6).toISOString();
    expect(formatDate(testDate)).toMatch('금요일');
  });
  test('should contain "토요일"', () => {
    const testDate = new Date(2025, 5, 7).toISOString();
    expect(formatDate(testDate)).toMatch('토요일');
  });
  test('should contain "일요일"', () => {
    const testDate = new Date(2025, 5, 8).toISOString();
    expect(formatDate(testDate)).toMatch('일요일');
  });
});

describe('formatDate invalid input handling', () => {
  test('should return fallback for empty string input', () => {
    const testDate = '';
    expect(formatDate(testDate)).toMatch('유효하지 않은 날짜');
  });
  test('should return fallback for gibberish string input', () => {
    const testDate = 'asdasdasd';
    expect(formatDate(testDate)).toMatch('유효하지 않은 날짜');
  });
  test('should return fallback for Korean characters input', () => {
    const testDate = 'ㅁㅇㄴㅁㄴㅇㅁㄴㅇㄴ';
    expect(formatDate(testDate)).toMatch('유효하지 않은 날짜');
  });
  test('should return fallback for special characters input', () => {
    const testDate = '!@#@$#';
    expect(formatDate(testDate)).toMatch('유효하지 않은 날짜');
  });
  test('should return fallback for whitespace-only input', () => {
    const testDate = '  ';
    expect(formatDate(testDate)).toMatch('유효하지 않은 날짜');
  });
  test('should return fallback for strange day input', () => {
    const testDate = '염요일';
    expect(formatDate(testDate)).toMatch('유효하지 않은 날짜');
  });
});
