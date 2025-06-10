# Utility Functions Library

A collection of essential utility functions for mathematical operations, color manipulation, performance optimization, and array processing in TypeScript/JavaScript applications.

## Features

- **Mathematical Operations**: Range mapping, interpolation, clamping
- **Array Processing**: Min/max extraction with custom selectors
- **Color Manipulation**: RGB/RGBA color interpolation
- **Performance Utilities**: Debouncing and throttling functions
- **Non-linear Mapping**: Advanced value mapping through custom ranges

## Installation

```bash
npm install @petitkit/utils
```

## Usage

```javascript
import {
  mapRange,
  mapRangeClamp,
  lerp,
  clamp,
  nonLinearMap,
  extend,
  min,
  max,
  mergeRGB,
  debounce,
  throttle,
  sum,
  sumObject
} from '@petitkit/utils';
```

## API Reference

### Mathematical Functions

#### `mapRange(inMin, inMax, input, outMin, outMax)`

Maps a value from one range to another without clamping.

```javascript
// Map 50 from range [0, 100] to range [0, 1]
const result = mapRange(0, 100, 50, 0, 1); // 0.5

// Map mouse position to rotation angle
const angle = mapRange(0, window.innerWidth, mouseX, 0, 360);
```

**Parameters:**
- `inMin` (number): Input range minimum
- `inMax` (number): Input range maximum  
- `input` (number): Value to map
- `outMin` (number): Output range minimum
- `outMax` (number): Output range maximum

**Returns:** Mapped value (number)

#### `mapRangeClamp(inMin, inMax, input, outMin, outMax)`

Maps a value from one range to another with automatic clamping to output bounds.

```javascript
// Value gets clamped to output range
const result = mapRangeClamp(0, 100, 150, 0, 1); // 1 (clamped)
const result2 = mapRangeClamp(0, 100, -10, 0, 1); // 0 (clamped)
```

#### `lerp(start, end, amt)`

Linear interpolation between two values.

```javascript
// 50% between 0 and 100
const result = lerp(0, 100, 0.5); // 50

// Smooth animation
const currentValue = lerp(currentValue, targetValue, 0.1);
```

**Parameters:**
- `start` (number): Starting value
- `end` (number): Ending value
- `amt` (number): Interpolation amount (0-1)

#### `clamp(min, input, max)`

Constrains a value between minimum and maximum bounds.

```javascript
const result = clamp(0, -5, 100); // 0
const result2 = clamp(0, 150, 100); // 100
const result3 = clamp(0, 50, 100); // 50
```

#### `nonLinearMap(value, arrayIn, arrayOut)`

Maps a value through non-linear ranges using input/output arrays.

```javascript
// Create easing curve
const input = [0, 25, 50, 75, 100];
const output = [0, 10, 60, 90, 100];
const result = nonLinearMap(30, input, output); // Interpolated value

// Volume curve mapping
const volumes = [0, 0.1, 0.3, 0.7, 1.0];
const positions = [0, 20, 40, 80, 100];
const volume = nonLinearMap(sliderValue, positions, volumes);
```

### Array Processing Functions

#### `extend(array, selector?)`

Returns `[min, max]` values from an array using an optional selector function.

```javascript
const numbers = [1, 5, 3, 9, 2];
const [min, max] = extend(numbers); // [1, 9]

// With objects
const items = [{ price: 10 }, { price: 25 }, { price: 5 }];
const [minPrice, maxPrice] = extend(items, item => item.price); // [5, 25]
```

#### `min(array, selector?)` / `max(array, selector?)`

Get minimum or maximum values with optional selector functions.

```javascript
const numbers = [1, 5, 3, 9, 2];
const minimum = min(numbers); // 1
const maximum = max(numbers); // 9

// With selector
const users = [{ age: 25 }, { age: 30 }, { age: 20 }];
const youngest = min(users, user => user.age); // 20
const oldest = max(users, user => user.age); // 30
```

### Color Functions

#### `mergeRGB(color1, color2, progress)`

Interpolates between two RGB/RGBA colors based on progress (0-1).

```javascript
// Basic RGB interpolation
const color = mergeRGB('rgb(255, 0, 0)', 'rgb(0, 255, 0)', 0.5);
// Result: 'rgb(128, 128, 0)'

// RGBA support
const color2 = mergeRGB('rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 0.5)', 0.3);

// Animation example
const animatedColor = mergeRGB(startColor, endColor, animationProgress);
element.style.backgroundColor = animatedColor;
```

#### `hexToRgba(hex, alpha?)`

Converts a hex color code to RGBA format.

```javascript
// Basic hex to rgba conversion
const rgba = hexToRgba('#ff0000'); // 'rgba(255, 0, 0, 1)'

// With custom alpha
const semiTransparent = hexToRgba('#00ff00', 0.5); // 'rgba(0, 255, 0, 0.5)'
```

**Parameters:**
- `hex` (string): Hex color code (e.g., '#ff0000')
- `alpha` (number, optional): Alpha value between 0 and 1 (default: 1)

**Returns:** RGBA color string

### Performance Functions

#### `debounce(fn, wait)`

Creates a debounced function that delays execution until after `wait` milliseconds.

```javascript
// Debounce search input
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);

// Debounce window resize
const debouncedResize = debounce(() => {
  handleResize();
}, 250);

window.addEventListener('resize', debouncedResize);
```

#### `throttle(fn, wait)`

Creates a throttled function that executes at most once per `wait` milliseconds.

```javascript
// Throttle scroll handler
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 16); // ~60fps

// Throttle mouse move
const throttledMouseMove = throttle((e) => {
  updateCursor(e.clientX, e.clientY);
}, 10);

window.addEventListener('scroll', throttledScroll);
```

### Aggregation Functions

#### `sum(array)`

Calculates the sum of all numbers in an array.

```javascript
const numbers = [1, 2, 3, 4, 5];
const total = sum(numbers); // 15

// Calculate total price
const prices = [10.99, 25.50, 5.99];
const totalPrice = sum(prices); // 42.48
```

#### `sumObject(object)`

Calculates the sum of all numeric values in an object.

```javascript
const scores = { math: 85, science: 92, english: 78 };
const totalScore = sumObject(scores); // 255

// Handle undefined/null objects
const emptySum = sumObject(null); // 0
```

### DOM Event Functions

#### `addEvent(element, events, callback)`

Adds event listeners to an element or array of elements.

```javascript
// Single event
addEvent(button, 'click', handleClick);

// Multiple events
addEvent(element, ['mouseenter', 'mouseleave'], handleHover);

// Multiple elements
addEvent([button1, button2], 'click', handleClick);
```

**Parameters:**
- `element` (HTMLElement | HTMLElement[]): Target element(s)
- `events` (string | string[]): Event name(s) to listen for
- `callback` (function): Event handler function

#### `click(element, callback)`

Adds click and touch event listeners to an element or array of elements.

```javascript
// Single element
click(button, handleClick);

// Multiple elements
click([button1, button2], handleClick);
```

**Parameters:**
- `element` (HTMLElement | HTMLElement[]): Target element(s)
- `callback` (function): Event handler function

#### `stopPropagation(event)`

Stops event propagation.

```javascript
click(button, (e) => {
  stopPropagation(e);
  // Event won't bubble up
});
```

**Parameters:**
- `event` (Event): Event object

### Array Utility Functions

#### `first(array)`

Returns the first element of an array.

```javascript
const numbers = [1, 2, 3, 4, 5];
const firstNumber = first(numbers); // 1
```

**Parameters:**
- `array` (any[]): Input array

**Returns:** First element of the array

#### `last(array)`

Returns the last element of an array.

```javascript
const numbers = [1, 2, 3, 4, 5];
const lastNumber = last(numbers); // 5
```

**Parameters:**
- `array` (any[]): Input array

**Returns:** Last element of the array

### Number Formatting Functions

#### `numFixedX(num, x?)`

Rounds a number to a specified number of decimal places.

```javascript
const pi = 3.14159;
const rounded = numFixedX(pi, 2); // 3.14
const rounded2 = numFixedX(pi); // 3.14 (default 2 decimal places)
```

**Parameters:**
- `num` (number): Number to round
- `x` (number, optional): Number of decimal places (default: 2)

**Returns:** Rounded number

### Style Utility Functions

#### `objectToStyle(object)`

Converts a JavaScript object to CSS style string.

```javascript
const styles = {
  backgroundColor: 'red',
  fontSize: '16px',
  marginTop: '10px'
};
const cssString = objectToStyle(styles);
// Result: 'background-color: red; font-size: 16px; margin-top: 10px'
```

**Parameters:**
- `object` (Record<string, any>): Object containing CSS properties

**Returns:** CSS style string

## Common Use Cases

### Animation and Easing

```javascript
// Smooth value transitions
let currentValue = 0;
const targetValue = 100;

function animate() {
  currentValue = lerp(currentValue, targetValue, 0.1);
  element.style.transform = `translateX(\${currentValue}px)`;
  
  if (Math.abs(currentValue - targetValue) > 0.1) {
    requestAnimationFrame(animate);
  }
}
```

### Responsive Design

```javascript
// Map viewport width to font size
const fontSize = mapRangeClamp(320, 1920, window.innerWidth, 14, 24);
document.body.style.fontSize = `\${fontSize}px`;

// Responsive spacing
const padding = mapRange(0, 1000, window.innerWidth, 10, 50);
```

### Data Visualization

```javascript
// Normalize data for charts
const data = [10, 25, 15, 30, 20];
const [minVal, maxVal] = extend(data);

const normalizedData = data.map(value => 
  mapRange(minVal, maxVal, value, 0, 100)
);
```

### Performance Optimization

```javascript
// Optimize expensive operations
const expensiveOperation = debounce(() => {
  // Heavy computation here
  processLargeDataset();
}, 500);

const smoothScrollHandler = throttle((e) => {
  updateParallaxElements(e.scrollY);
}, 16);
```

## TypeScript Support

All functions include full TypeScript type definitions:

```typescript
// Type-safe usage
const result: number = mapRange(0, 100, 50, 0, 1);
const colors: string = mergeRGB('rgb(255,0,0)', 'rgb(0,255,0)', 0.5);

// Generic array functions
interface Item { value: number; }
const items: Item[] = [{ value: 1 }, { value: 5 }];
const maxValue: number = max(items, item => item.value);
```

## Browser Support

- ES6+ environments
- Node.js 12+
- All modern browsers
- TypeScript 4.0+

## License

MIT License