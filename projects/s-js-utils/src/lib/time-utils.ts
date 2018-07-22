import { last, ObjectWith } from 'micro-dash';
import { roundToMultipleOf } from './misc-utils';

export const enum TimeUnit {
  Nanoseconds = 'ns',
  Microseconds = 'μs',
  Milliseconds = 'ms',
  Seconds = 's',
  Minutes = 'm',
  Hours = 'h',
  Days = 'd',
  Weeks = 'w',
  Years = 'y',
  Decades = 'dec',
  Centuries = 'cent',
  Millenia = 'mil'
}

export function convertTime(value: number, unit: string, targetUnit: string) {
  return (value * nanoConversions[unit]) / nanoConversions[targetUnit];
}

export function elapsedToString(
  elapsed: number,
  units: string[],
  { elapsedUnit = TimeUnit.Milliseconds, showLeadingZeros = true } = {}
) {
  elapsed = roundToMultipleOf(
    convertTime(1, last(units), elapsedUnit),
    elapsed
  );

  let showZeros = showLeadingZeros;
  const tokens: Array<number | string> = [];
  for (const unit of units) {
    const conversion = convertTime(1, elapsedUnit, unit);
    const value = Math.floor(elapsed * conversion);
    if (value > 0 || showZeros) {
      tokens.push(value);
      tokens.push(unit);
      showZeros = true;
    }
    elapsed -= value / conversion;
  }
  return tokens.join(' ');
}

const nanoConversions: ObjectWith<number> = {};
addConversion(TimeUnit.Nanoseconds, 'Nanosecond', 1, { aliases: ['nanos'] });
addConversion(TimeUnit.Microseconds, 'Microsecond', 1000, {
  aliases: ['micros']
});
addConversion(TimeUnit.Milliseconds, 'Millisecond', 1000 * 1000, {
  aliases: ['millis']
});
addConversion(TimeUnit.Seconds, 'Second', 1000 * 1000 * 1000, {
  aliases: ['S', 'sec', 'secs']
});
addConversion(TimeUnit.Minutes, 'Minute', 60 * 1000 * 1000 * 1000, {
  aliases: ['M', 'min', 'mins']
});
addConversion(TimeUnit.Hours, 'Hour', 60 * 60 * 1000 * 1000 * 1000, {
  aliases: ['H', 'hr', 'hrs']
});
addConversion(TimeUnit.Days, 'Day', 24 * 60 * 60 * 1000 * 1000 * 1000, {
  aliases: ['D']
});
addConversion(TimeUnit.Weeks, 'Week', 7 * 24 * 60 * 60 * 1000 * 1000 * 1000, {
  aliases: ['W', 'wk', 'wks']
});
addConversion(TimeUnit.Years, 'Year', 365 * 24 * 60 * 60 * 1000 * 1000 * 1000, {
  aliases: ['Y', 'yr', 'yrs']
});
addConversion(
  TimeUnit.Decades,
  'Decade',
  10 * 365 * 24 * 60 * 60 * 1000 * 1000 * 1000
);
addConversion(
  TimeUnit.Centuries,
  'Century',
  100 * 365 * 24 * 60 * 60 * 1000 * 1000 * 1000,
  { plural: 'Centuries' }
);
addConversion(
  TimeUnit.Millenia,
  'Millenium',
  1000 * 365 * 24 * 60 * 60 * 1000 * 1000 * 1000,
  { plural: 'Millenia' }
);

function addConversion(
  unit: TimeUnit,
  singular: string,
  nanos: number,
  { aliases = [] as string[], plural = singular + 's' } = {}
) {
  for (const key of [
    unit,
    singular,
    singular.toLowerCase(),
    plural,
    plural.toLowerCase(),
    ...aliases
  ]) {
    nanoConversions[key] = nanos;
  }
}
