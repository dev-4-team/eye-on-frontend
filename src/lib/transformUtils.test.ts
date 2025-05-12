import { formatDate, numberTransfer } from '@/lib/utils';

describe('formatDate full format test', () => {
  const cases = [
    ['2025-06-02', '6월 2일 월요일 0시 0분'],
    ['2025-06-03', '6월 3일 화요일 0시 0분'],
    ['2025-06-04', '6월 4일 수요일 0시 0분'],
    ['2025-06-05', '6월 5일 목요일 0시 0분'],
    ['2025-06-06', '6월 6일 금요일 0시 0분'],
    ['2025-06-07', '6월 7일 토요일 0시 0분'],
    ['2025-06-08', '6월 8일 일요일 0시 0분'],
  ];

  test.each(cases)('should return "%s" -> %s', (dateString, expected) => {
    const list = dateString.split('-');
    const year = Number(list[0]);
    const month = Number(list[1]);
    const day = Number(list[2]);
    const isoDate = new Date(year, month - 1, day).toISOString();
    expect(formatDate(isoDate)).toBe(expected);
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
    expect(() => formatDate(testDate)).toThrow('유효하지 않은 날짜입니다.');
  });
  test('should return fallback for gibberish string input', () => {
    const testDate = 'asdasdasd';
    expect(() => formatDate(testDate)).toThrow('유효하지 않은 날짜입니다.');
  });
  test('should return fallback for Korean characters input', () => {
    const testDate = 'ㅁㅇㄴㅁㄴㅇㅁㄴㅇㄴ';
    expect(() => formatDate(testDate)).toThrow('유효하지 않은 날짜입니다.');
  });
  test('should return fallback for special characters input', () => {
    const testDate = '!@#@$#';
    expect(() => formatDate(testDate)).toThrow('유효하지 않은 날짜입니다.');
  });
  test('should return fallback for whitespace-only input', () => {
    const testDate = '  ';
    expect(() => formatDate(testDate)).toThrow('유효하지 않은 날짜입니다.');
  });
  test('should return fallback for strange day input', () => {
    const testDate = '염요일';
    expect(() => formatDate(testDate)).toThrow('유효하지 않은 날짜입니다.');
  });
});

describe('numberTransfer should correct value', () => {
  test('should return correct value when number is lower than 1000', () => {
    const testDataInput = 123;
    expect(numberTransfer(testDataInput)).toBe(String(testDataInput));
  });
  test('should return correct value when typeof string number is lower than 1000', () => {
    const testDataInput = '123';
    expect(numberTransfer(testDataInput)).toBe(String(testDataInput));
  });
  test('should return correct value when number is 1000', () => {
    const testDataInput = 1000;
    expect(numberTransfer(testDataInput)).toBe('1.0K');
  });
  test('should return correct value when number is 1200', () => {
    const testDataInput = 1233;
    expect(numberTransfer(testDataInput)).toBe('1.2K');
  });
  test('should return correct value when number is 10000', () => {
    const testDataInput = 10000;
    expect(numberTransfer(testDataInput)).toBe('10.0K');
  });
  test('should return correct value when number is 100000', () => {
    const testDataInput = 100000;
    expect(numberTransfer(testDataInput)).toBe('100.0K');
  });
  test('should return correct value when number is 100000', () => {
    const testDataInput = 1000000;
    expect(numberTransfer(testDataInput)).toBe('1.0M');
  });
});

describe('numberTransfer invalid input handling', () => {
  test('should return fallback for empty string input', () => {
    const testDataInput = '';
    expect(() => numberTransfer(testDataInput)).toThrow('유효하지 않은 숫자입니다.');
  });
  test('should return fallback for space string input', () => {
    const testDataInput = '  ';
    expect(() => numberTransfer(testDataInput)).toThrow('유효하지 않은 숫자입니다.');
  });
  test('should return fallback for gibberish string input', () => {
    const testDataInput = 'asdasdasd';
    expect(() => numberTransfer(testDataInput)).toThrow('유효하지 않은 숫자입니다.');
  });
  test('should return fallback for special character input', () => {
    const testDataInput = '@#!#*';
    expect(() => numberTransfer(testDataInput)).toThrow('유효하지 않은 숫자입니다.');
  });
});
