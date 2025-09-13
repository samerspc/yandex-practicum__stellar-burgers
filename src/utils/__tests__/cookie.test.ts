import { getCookie, setCookie, deleteCookie } from '../cookie';

describe('cookie utils', () => {
  beforeEach(() => {
    // Очищаем cookies перед каждым тестом
    document.cookie = '';
  });

  describe('setCookie', () => {
    it('should set a simple cookie', () => {
      setCookie('test', 'value');
      expect(document.cookie).toContain('test=value');
    });

    it('should set cookie with path', () => {
      setCookie('test', 'value', { path: '/admin' });
      expect(document.cookie).toContain('test=value');
      expect(document.cookie).toContain('path=/admin');
    });

    it('should set cookie with expiration', () => {
      const expiration = new Date('2024-12-31');
      setCookie('test', 'value', { expires: expiration });
      expect(document.cookie).toContain('test=value');
      expect(document.cookie).toContain('expires=');
    });

    it('should encode special characters in value', () => {
      setCookie('test', 'value with spaces & symbols');
      expect(document.cookie).toContain('test=value%20with%20spaces%20%26%20symbols');
    });

    it('should set secure cookie', () => {
      setCookie('test', 'value', { secure: true });
      expect(document.cookie).toContain('test=value');
      expect(document.cookie).toContain('secure');
    });
  });

  describe('getCookie', () => {
    it('should get existing cookie', () => {
      document.cookie = 'test=value';
      expect(getCookie('test')).toBe('value');
    });

    it('should return undefined for non-existing cookie', () => {
      expect(getCookie('nonexistent')).toBeUndefined();
    });

    it('should decode special characters', () => {
      document.cookie = 'test=value%20with%20spaces';
      expect(getCookie('test')).toBe('value with spaces');
    });

    it('should get cookie when multiple cookies exist', () => {
      document.cookie = 'cookie1=value1; test=value; cookie2=value2';
      expect(getCookie('test')).toBe('value');
    });

    it('should handle empty cookie value', () => {
      document.cookie = 'test=';
      expect(getCookie('test')).toBe('');
    });
  });

  describe('deleteCookie', () => {
    it('should delete cookie by setting expires to past date', () => {
      setCookie('test', 'value');
      expect(document.cookie).toContain('test=value');
      
      deleteCookie('test');
      expect(document.cookie).toContain('test=; expires=');
    });

    it('should handle deletion of non-existing cookie', () => {
      expect(() => deleteCookie('nonexistent')).not.toThrow();
    });
  });

  describe('integration tests', () => {
    it('should work with set, get, and delete cycle', () => {
      // Set cookie
      setCookie('integration', 'test-value');
      expect(getCookie('integration')).toBe('test-value');
      
      // Update cookie
      setCookie('integration', 'updated-value');
      expect(getCookie('integration')).toBe('updated-value');
      
      // Delete cookie
      deleteCookie('integration');
      expect(getCookie('integration')).toBeUndefined();
    });

    it('should handle multiple cookies independently', () => {
      setCookie('cookie1', 'value1');
      setCookie('cookie2', 'value2');
      setCookie('cookie3', 'value3');
      
      expect(getCookie('cookie1')).toBe('value1');
      expect(getCookie('cookie2')).toBe('value2');
      expect(getCookie('cookie3')).toBe('value3');
      
      deleteCookie('cookie2');
      
      expect(getCookie('cookie1')).toBe('value1');
      expect(getCookie('cookie2')).toBeUndefined();
      expect(getCookie('cookie3')).toBe('value3');
    });
  });
});
