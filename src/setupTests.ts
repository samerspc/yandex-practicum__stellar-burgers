import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), 
    removeListener: jest.fn(), 
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock для sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.sessionStorage = sessionStorageMock as any;

// Mock для document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

// Mock для fetch
global.fetch = jest.fn();

// Mock для window.history
Object.defineProperty(window, 'history', {
  value: {
    back: jest.fn(),
    forward: jest.fn(),
    go: jest.fn(),
    pushState: jest.fn(),
    replaceState: jest.fn(),
  },
});

delete (window as any).location;
window.location = {
  ...window.location,
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
} as any;
