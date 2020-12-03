/* global test expect */
import isPalindrom from '../src/isPalindrome';

test('Anna', () => {
    expect(isPalindrom('Anna')).toBe(true);
  });
  test('Civic', () => {
    expect(isPalindrom('Civic')).toBe(true);
  });
  test('level', () => {
    expect(isPalindrom('level')).toBe(true);
  });
  test('wow', () => {
    expect(isPalindrom('wow')).toBe(true);
  });
  test('Racecar', () => {
    expect(isPalindrom('Racecar')).toBe(true);
  });
  
  test('Sun', () => {
    expect(isPalindrom('Sun')).toBe(false);
  });
  test('Machine', () => {
    expect(isPalindrom('Machine')).toBe(false);
  });
  test('hi', () => {
    expect(isPalindrom('hi')).toBe(false);
  });
  test('function', () => {
    expect(isPalindrom('function')).toBe(false);
  });
  test('book', () => {
    expect(isPalindrom('book')).toBe(false);
  });
  
  test('100500', () => {
    expect(isPalindrom('100500')).toBe(false);
  });
  test('1', () => {
    expect(isPalindrom('1')).toBe(true);
  });
  test('202', () => {
    expect(isPalindrom('202')).toBe(true);
  });
  test('1', () => {
    expect(isPalindrom(1)).toBe(true);
  });
  test('202', () => {
    expect(isPalindrom(202)).toBe(true);
  });
  
  test('CaSe', () => {
    expect(isPalindrom('CaSe')).toBe(false);
  });
  test('AnNa', () => {
    expect(isPalindrom('AnNa')).toBe(true);
  });
  test('Re44er', () => {
    expect(isPalindrom('Re44er')).toBe(true);
  });
  test('mousE', () => {
    expect(isPalindrom('mousE')).toBe(false);
  });
  test('g4rwfler', () => {
    expect(isPalindrom('g4rwfler')).toBe(false);
  });
  
  test("o'clock", () => {
    expect(isPalindrom("o'clock")).toBe(false);
  });
  test('$$', () => {
    expect(isPalindrom('$$')).toBe(true);
  });
  test('@nn@', () => {
    expect(isPalindrom('@nn@')).toBe(true);
  });
  test('foo oof', () => {
    expect(isPalindrom('foo oof')).toBe(true);
  });
  test('space " " ', () => {
    expect(isPalindrom(' ')).toBe(true);
  });
  
  
  test(' 202', () => {
    expect(isPalindrom(' 202')).toBe(true);
  });
  test('[ 1, 1 ]', () => {
    expect(isPalindrom([ 1, 1 ])).toBe(false);
  });
  test('{ hello: "world" }', () => {
    expect(isPalindrom({ hello: 'world' })).toBe(false);
  });
  test('null', () => {
    expect(isPalindrom(null)).toBe(false);
  });
  test('undefined', () => {
    expect(isPalindrom(undefined)).toBe(false);
  });
  
  test('0', () => {
    expect(isPalindrom(0)).toBe(true);
  });
  test('empty "" ', () => {
    expect(isPalindrom('')).toBe(true);
  });
  test('a nna', () => {
    expect(isPalindrom('a nna')).toBe(true);
  });
//   test('01', () => {
//     expect(isPalindrom(01)).toBe(false);
//   });
//   test('0102', () => {
//     expect(isPalindrom(0102)).toBe(false);
//   });