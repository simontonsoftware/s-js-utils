# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.2.0](https://github.com/simontonsoftware/s-js-utils/compare/v6.1.0...v6.2.0) (2020-04-28)

### Features

- add `assert()` ([7890682](https://github.com/simontonsoftware/s-js-utils/commit/789068286cdfe43d6d6886a74584191271ac8aa7))

## [6.1.0](https://github.com/simontonsoftware/s-js-utils/compare/v6.0.0...v6.1.0) (2020-04-25)

### Features

- add `wrapMethod()` ([39d559e](https://github.com/simontonsoftware/s-js-utils/commit/39d559e34df3546a52c611be2971432fcad65e2b))

## [6.0.0](https://github.com/simontonsoftware/s-js-utils/compare/v5.3.0...v6.0.0) (2020-02-08)

### ⚠ BREAKING CHANGES

- requires micro-dash 7
- requires Typescript 3.7
- `forEachWithObject()` is removed. Use `transform()` from micro-dash, instead; it is equivalent.
- You must supply a type parameter to `CallableObject` now. On the bright side, you no longer need to define a separate interface for its subclasses!

### Features

- add `Debouncer` ([595e3c9](https://github.com/simontonsoftware/s-js-utils/commit/595e3c959bb1d9ce4506b4ba93a058bc9052c7d5))
- better typing for `CallableObject` ([b1748bc](https://github.com/simontonsoftware/s-js-utils/commit/b1748bc63809ac8fd146cb67b5af81c14b77130d))

### Bug Fixes

- `convertTime()` was not working in a prod build. Closes [#13](https://github.com/simontonsoftware/s-js-utils/issues/13). ([f46de6d](https://github.com/simontonsoftware/s-js-utils/commit/f46de6dfa4017344b293aa5ff3bc5e27bdba8ddf))

* remove `forEachWithObject()` ([6ca37e8](https://github.com/simontonsoftware/s-js-utils/commit/6ca37e8422249f2011c3837e260ba14997e282c0))
* upgrade buildchain ([fdeb9b5](https://github.com/simontonsoftware/s-js-utils/commit/fdeb9b5f4d7199f1b855e6bd086ca8509ea1482d))
* upgrade dependencies ([0adf6b4](https://github.com/simontonsoftware/s-js-utils/commit/0adf6b48e8fbc1ab619fcc5a4eeae92e338ff1f9))

## [5.3.0](https://github.com/simontonsoftware/s-js-utils/compare/v5.2.0...v5.3.0) (2019-11-09)

### Features

- add `forEachWithObject()` ([f165693](https://github.com/simontonsoftware/s-js-utils/commit/f165693))
- add `mapAsKeys()` ([f80e70e](https://github.com/simontonsoftware/s-js-utils/commit/f80e70e))
- add `mapToObject()` ([eeae081](https://github.com/simontonsoftware/s-js-utils/commit/eeae081))

## [5.2.0](https://github.com/simontonsoftware/s-js-utils/compare/v5.1.0...v5.2.0) (2019-07-17)

### Features

- add `Deferred.isPending()` ([7740d49](https://github.com/simontonsoftware/s-js-utils/commit/7740d49))
- improve typing of `Deferred.resolve` ([977c5b4](https://github.com/simontonsoftware/s-js-utils/commit/977c5b4))

## [5.1.0](https://github.com/simontonsoftware/s-js-utils/compare/v5.0.0...v5.1.0) (2019-06-26)

### Bug Fixes

- remove accidental dependency on `s-ng-dev-utils` ([1fb3dd1](https://github.com/simontonsoftware/s-js-utils/commit/1fb3dd1))

### Features

- add `around` hook to `wrapFunction()` ([1f04688](https://github.com/simontonsoftware/s-js-utils/commit/1f04688))
- add several basic set operations (most from MDN) ([bc48896](https://github.com/simontonsoftware/s-js-utils/commit/bc48896))

## [5.0.0](https://github.com/simontonsoftware/s-js-utils/compare/v4.0.0...v5.0.0) (2019-05-30)

### chore

- more upgrades ([601b36b](https://github.com/simontonsoftware/s-js-utils/commit/601b36b))
- update dependencies ([6ed10d6](https://github.com/simontonsoftware/s-js-utils/commit/6ed10d6))

### BREAKING CHANGES

- requires micro-dash 6.0 (up from 5.0)
- Uses Typescript 3.4

<a name="4.0.0"></a>

# [4.0.0](https://github.com/simontonsoftware/s-js-utils/compare/v3.1.1...v4.0.0) (2019-01-05)

### Features

- add `isEqualAtDepth()` ([fc54411](https://github.com/simontonsoftware/s-js-utils/commit/fc54411))

### BREAKING CHANGES

- requires micro-dash 5.4

<a name="3.1.1"></a>

## [3.1.1](https://github.com/simontonsoftware/s-js-utils/compare/v3.1.0...v3.1.1) (2018-12-08)

### Bug Fixes

- `elapsedToString` now returns the last unit when `elapsed` is 0 ([ca1095c](https://github.com/simontonsoftware/s-js-utils/commit/ca1095c))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/simontonsoftware/s-js-utils/compare/v3.0.0...v3.1.0) (2018-11-25)

### Features

- add `wrapFunction()` ([a969706](https://github.com/simontonsoftware/s-js-utils/commit/a969706))

<a name="3.0.0"></a>

# 3.0.0 (2018-11-10)

### Features

- add `createBuilder()` ([e9b5a3d](https://github.com/simontonsoftware/s-js-utils/commit/e9b5a3d))
- add `sleep()` ([02e689b](https://github.com/simontonsoftware/s-js-utils/commit/02e689b))
- add `toCsv()` ([143fe2e](https://github.com/simontonsoftware/s-js-utils/commit/143fe2e))

### BREAKING CHANGES

- uses Typescript 3 (up from Typescript 2)
- requires micro-dash 5 (up from micro-dash 4)
- `createBuilder()` replaces `TestFactorySuperclass`

<a name="2.1.0"></a>

# [2.1.0](https://github.com/simontonsoftware/s-js-utils/compare/v2.0.0...v2.1.0) (2018-08-29)

### Features

- add `CallableObject` ([160e9b1](https://github.com/simontonsoftware/s-js-utils/commit/160e9b1))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/simontonsoftware/s-js-utils/compare/v1.1.1...v2.0.0) (2018-08-17)

### Chores

- update dependencies ([b3e5fe1](https://github.com/simontonsoftware/s-js-utils/commit/b3e5fe1))
- upgrade micro-dash ([8c05b01](https://github.com/simontonsoftware/s-js-utils/commit/8c05b01))

### Features

- add `TestFactory` ([58590e2](https://github.com/simontonsoftware/s-js-utils/commit/58590e2))

### BREAKING CHANGES

- requires micro-dash 4.x
- updates to TypeScript 2.9
