/**
 * Objects that can be managed by `MigrationManager` must conform to this interface.
 */
import { assert } from './assert';

export interface VersionedObject {
  _version: number;
}

/**
 * A migration that can be registered with `MigrationManager`. Note that the function does not need to migrate all the way to `targetVersion`, only to something higher than `source._version`. Usually a migration will only upgrade by 1.
 */
export type MigrateFunction<T> = (source: T, targetVersion: number) => T;

/**
 * Use to migrate "versioned objects" from an old version to the latest. This is useful e.g. when keeping state in local storage, and you release a new version of your app that changes its format.
 *
 * For example, say your app stores an object in the shape `{ _version: 3, key_1: string }`. You change your code to remove the underscore from `key_1`, so you want to migrate data on users' machines accordingly. Bump your version to 4 and use `MigrationManager` like this:
 *
 * ```ts
 * interface MyData extends VersionedObject {
 *   _version: number;
 *   key1: string;
 * }
 * const defaultData: MyData = {
 *   _version: 4,
 *   key1: 'default value',
 * }
 *
 * const migrater = new MigrationManager<MyData>();
 * migrater.registerMigration(3, (oldObject: any) => {
 *   return { _version: 4, key1: oldObject.key_1 };
 * });
 *
 * const defaultData = { _version: 4, key1: 'default value' };
 * const dataThatMightBeInOldFormat = getDataFromWhereverItIsStored();
 * const dataInNewFormat = migrater.run(dataThatMightBeInOldFormat, defaultData);
 * ```
 */
export class MigrationManager<T extends VersionedObject> {
  private migrations = new Map<number | undefined, MigrateFunction<T>>();

  /**
   * Runs any registered migrations necessary to convert `source` to the latest format. If it is already in the latest format, no migrations run and it is returned unmodified.
   *
   * @param reference An object with the latest `_version`. If an error is thrown during migration, and a subclass overrides `onError` to handle it, `reference` will be returned. In this way it acts as a default value in case migration fails. If `onError` is not overridden, the error will propagate up to the caller.
   */
  run(source: T, reference: T) {
    try {
      return this.upgradeTo(reference._version, source);
    } catch (error) {
      this.onError(error);
      return reference;
    }
  }

  /**
   * Registers a function to update an object that is currently at `sourceVersion`. The function must return a new object at a higher version number. Most commonly each migration will upgrade the object by only 1 version. The output of the older migrations will be passed in turn to newer migrations until the target version is reached.
   *
   * Use `undefined` as the `sourceVersion` to handle migrations from a previous format that did not have the `_version` key.
   *
   * `migrateFunction` will be called with the migration manager itself as `this`. This allows subclasses to pass in methods as a migration function without doing any special binding, e.g.:
   *
   * ```ts
   * class MigrationService extends MigrationManager<MyState> {
   *   constructor(private messaging: MessagingService) {
   *     super();
   *     this.registerMigration(1, this.migrateFrom1); // no special binding
   *   }
   *
   *   private migrateFrom1(source: MyState) {
   *     this.messaging.show("You've been upgraded!"); // you can still use `this`
   *     return { ...source, _version: 2 };
   *   }
   * }
   * ```
   */
  registerMigration(
    sourceVersion: number | undefined,
    migrateFunction: MigrateFunction<T>,
  ) {
    this.migrations.set(sourceVersion, migrateFunction.bind(this));
  }

  /**
   * Handles any error thrown by a registered migration. This implementation simply rethrows the error so that it propagates out of `run()`. If you override this so that it no longer rethrows, `run()` will treat `reference` as the "default value" to return in the case of an error. You could then use this hook e.g. to provide a nice message to the user explaining that their data couldn't be recovered.
   */
  protected onError(error: any) {
    throw error;
  }

  private upgradeTo(targetVersion: number, upgradable: T) {
    let lastVersion = upgradable._version;
    assert(lastVersion === undefined || lastVersion <= targetVersion);
    while (lastVersion !== targetVersion) {
      upgradable = this.upgradeOneStep(upgradable, targetVersion);
      const newVersion = upgradable._version;
      if (lastVersion) {
        assert(
          newVersion > lastVersion,
          `${lastVersion} to ${newVersion} is not an upgrade...`,
        );
      }
      assert(
        newVersion <= targetVersion,
        `${newVersion} is past the target version of ${targetVersion}`,
      );
      lastVersion = newVersion;
    }
    return upgradable;
  }

  private upgradeOneStep(upgradable: T, targetVersion: number) {
    const version = upgradable._version;
    const migrationFunction = this.migrations.get(version);
    if (!migrationFunction) {
      throw new Error(`Unable to migrate from version ${version}`);
    }

    return migrationFunction(upgradable, targetVersion);
  }
}
