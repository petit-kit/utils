// Map a value from one range to another
const mapRange = (
  inMin: number,
  inMax: number,
  input: number,
  outMin: number,
  outMax: number
) => ((input - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

// Map a value from one range to another with clamping
const mapRangeClamp = (
  inMin: number,
  inMax: number,
  input: number,
  outMin: number,
  outMax: number
) =>
  input < inMin
    ? outMin
    : input > inMax
    ? outMax
    : mapRange(inMin, inMax, input, outMin, outMax);

// Linear interpolation between two values
const lerp = (start: number, end: number, amt: number) =>
  (1 - amt) * start + amt * end;

// Clamp a value between min and max
const clamp = (min: number, input: number, max: number) =>
  Math.max(min, Math.min(input, max));

// Map a value through non-linear ranges
const nonLinearMap = (value: number, arrayIn: number[], arrayOut: number[]) => {
  const index = arrayIn.findIndex((v) => v > value);
  if (index === -1) return arrayOut[arrayOut.length - 1];
  if (index === 0) return arrayOut[0];
  return lerp(
    arrayOut[index - 1],
    arrayOut[index],
    (value - arrayIn[index - 1]) / (arrayIn[index] - arrayIn[index - 1])
  );
};

// Get min and max values from an array using a selector function
const extend = (array: number[], selector = (x: number) => x) => [
  Math.min(...array.map(selector)),
  Math.max(...array.map(selector)),
];

// Get minimum value from an array using a selector function
const min = (array: number[], selector = (x: number) => x) =>
  Math.min(...array.map(selector));

// Get maximum value from an array using a selector function
const max = (array: number[], selector = (x: number) => x) =>
  Math.max(...array.map(selector));

// Merge RGB colors based on a progress value from 0 to 1
const mergeRGB = (color1: string, color2: string, progress: number) => {
  // Extract RGB/RGBA values using regex
  const values1 = color1.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0, 1];
  const values2 = color2.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0, 1];

  // Ensure alpha values exist, default to 1 if not present
  const rgb1 = [...values1.slice(0, 3), values1[3] ?? 1];
  const rgb2 = [...values2.slice(0, 3), values2[3] ?? 1];

  // Interpolate between the RGBA values
  const r = Math.round(lerp(rgb1[0], rgb2[0], progress));
  const g = Math.round(lerp(rgb1[1], rgb2[1], progress));
  const b = Math.round(lerp(rgb1[2], rgb2[2], progress));
  const a = lerp(rgb1[3], rgb2[3], progress);

  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
};

const hexToRgba = (hex: string, alpha: number = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)?.map((c) => parseInt(c, 16)) || [
    0, 0, 0,
  ];
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const debounce = (fn: Function, wait: number) => {
  let timeout: number;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => fn.apply(this, args), wait);
  };
};

const throttle = (fn: Function, wait: number) => {
  let lastTime = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastTime > wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
};

const sum = (array: number[]) => array.reduce((acc, curr) => acc + curr, 0);

const sumObject = (value: Record<string, number>) =>
  Object.values(value || {}).reduce((acc, curr) => acc + curr, 0);

const addEvent = (
  element: HTMLElement,
  events: string | string[],
  callback: (e: Event) => void
) => {
  if (Array.isArray(element) || element instanceof NodeList) {
    element.forEach((el) => {
      addEvent(el, events, callback);
    });
  } else {
    (Array.isArray(events) ? events : [events]).forEach((event) => {
      element.addEventListener(event, callback, { passive: false });
    });
  }
};

const click = (
  element: HTMLElement | HTMLElement[],
  callback: (e: Event) => void
) => {
  if (Array.isArray(element) || element instanceof NodeList) {
    element.forEach((el: any) => {
      click(el, callback);
    });
  } else {
    addEvent(element, ["click", "touchend"], callback);
  }
};

const first = (array: any[]) => {
  return array[0];
};

const last = (array: any[]) => {
  return array[array.length - 1];
};

const numFixedX = (num: number, x: number = 2) => {
  return Math.round(num * 10 ** x) / 10 ** x;
};

const stopPropagation = (e: Event) => e.stopPropagation();

const objectToStyle = (object: Record<string, any>) => {
  return Object.entries(object)
    .map(
      ([key, value]) =>
        `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`
    )
    .join(";");
};

const deepEqual = (a: any, b: any): boolean =>
  a === b
    ? true
    : a && b && typeof a === "object" && typeof b === "object"
    ? Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((k) => k in b && deepEqual(a[k], b[k]))
    : false;

const forEach = (collection: any, callback: Function) => {
  if (Array.isArray(collection)) {
    for (let i = 0, len = collection.length; i < len; i++) {
      callback(collection[i], i, collection);
    }
  } else if (collection && typeof collection === "object") {
    for (const key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)) {
        callback(collection[key], key, collection);
      }
    }
  }
};

export {
  mapRange,
  mapRangeClamp,
  clamp,
  lerp,
  nonLinearMap,
  extend,
  min,
  max,
  mergeRGB,
  hexToRgba,
  debounce,
  throttle,
  sum,
  sumObject,
  click,
  addEvent,
  first,
  last,
  numFixedX,
  stopPropagation,
  objectToStyle,
  deepEqual,
  forEach,
};
