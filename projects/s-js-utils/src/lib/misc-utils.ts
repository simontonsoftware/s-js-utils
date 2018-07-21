import { isUndefined } from 'util';

export function isDefined(value: any) {
  return !isUndefined(value);
}
