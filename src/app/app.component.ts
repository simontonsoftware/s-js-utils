import { Component } from '@angular/core';
import { identity, noop } from 'micro-dash';
import {
  assert,
  convertTime,
  createBuilder,
  Debouncer,
  Deferred,
  elapsedToString,
  isDefined,
  isEqualAtDepth,
  isSetEqual,
  isSuperset,
  mapAsKeys,
  mapToObject,
  MigrationManager,
  roundToMultipleOf,
  setDifference,
  setIntersection,
  setUnion,
  sleep,
  symmetricSetDifference,
  TimeUnit,
  toCsv,
  wrapFunction,
  wrapMethod,
} from 's-js-utils';
import { Multiplier } from './multiplier';

/* eslint-disable */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Failure';

  constructor() {
    //
    // just use each function in the library once to prove we can import it
    //

    // functions
    new Multiplier(2)(3); // uses CallableObject
    wrapFunction((a: number, b: number) => a + b, {});
    wrapMethod({ a() {} }, 'a', {});

    // objects
    createBuilder(() => ({ text: 'hi' }))();
    isEqualAtDepth(1, 1, 1);
    mapAsKeys([], identity);
    mapToObject([], () => ['a', 1]);

    // sets
    const set = new Set([]);
    isSetEqual(set, set);
    isSuperset(set, set);
    setDifference(set, set);
    setIntersection(set, set);
    setUnion(set, set);
    symmetricSetDifference(set, set);

    // time
    new Debouncer().run(noop);
    new Deferred().resolve(42);
    sleep(1000);
    const conversion = convertTime(1, TimeUnit.Seconds, TimeUnit.Microseconds);
    if (conversion !== 1000000) {
      throw new Error(
        `${conversion} !== 1000000 (this was a bug in production builds, where it was NaN)`,
      );
    }
    elapsedToString(499, ['s']);

    // root
    assert(true);
    isDefined(1);
    new MigrationManager<any>().run.bind(this);
    roundToMultipleOf(2, 0);
    toCsv([['eats shoots and leaves', 'eats, shoots, and leaves']]);

    this.title = 's-js-utils-platform';
  }
}
