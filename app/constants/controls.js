import {MAX_WIDTH, MAX_HEIGHT} from './index';

const margin = 10;
export const arrowSize = 50;
export const deltaX = 5;
export const arrows = [
  {label: '<-', size: arrowSize, direction: 'left', x: -margin, y: 50},
  {
    label: '->',
    size: arrowSize,
    direction: 'right',
    x: arrowSize * 2 + margin,
    y: 50,
  },
  {label: '/\\', size: arrowSize, direction: 'up', x: arrowSize, y: -margin},
];