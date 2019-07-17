# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
