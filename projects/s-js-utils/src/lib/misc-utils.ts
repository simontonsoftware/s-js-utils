import { isUndefined } from 'micro-dash';

export function isDefined(value: any) {
  return !isUndefined(value);
}

export function roundToMultipleOf(multiple: number, value: number) {
  return Math.round(value / multiple) * multiple;
}
