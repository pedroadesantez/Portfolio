import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock HTMLCanvasElement getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  return {
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 100 })),
  }
})

HTMLCanvasElement.prototype.toDataURL = jest.fn(
  () => 'data:image/png;base64,mock-canvas-data'
)

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
})

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 100,
  height: 100,
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
  x: 0,
  y: 0,
  toJSON: jest.fn(),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    main: ({ children, ...props }) => <main {...props}>{children}</main>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useAnimation: () => ({}),
  useMotionValue: (initial) => ({ set: jest.fn(), get: () => initial }),
  useTransform: () => ({}),
  useSpring: () => ({}),
  useReducedMotion: () => false,
  useCycle: () => [0, jest.fn()],
}))

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0))
global.cancelAnimationFrame = jest.fn()

// Mock performance.now
Object.defineProperty(performance, 'now', {
  writable: true,
  value: jest.fn(() => Date.now()),
})
