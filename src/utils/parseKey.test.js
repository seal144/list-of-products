import parseKey from './parseKey';

describe('parseKey function', () => {
  test('should return "Name" when given "name"', () => {
    expect(parseKey('name')).toBe('Name');
  });

  test('should return "Pantone value" when given "pantone_value"', () => {
    expect(parseKey('pantone_value')).toBe('Pantone value');
  });

  test('should return "Test test test" when given "test_test_test"', () => {
    expect(parseKey('test_test_test')).toBe('Test test test');
  });
});
