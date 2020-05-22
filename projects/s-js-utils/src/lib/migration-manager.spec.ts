import { expectSingleCallAndReset } from 's-ng-dev-utils';
import { MigrationManager, VersionedObject } from './migration-manager';

describe('MigrationManager', () => {
  it('works for the example in the docs', () => {
    interface MyData extends VersionedObject {
      _version: number;
      key1: string;
    }
    const defaultData: MyData = {
      _version: 4,
      key1: 'default value',
    };

    const migrater = new MigrationManager<MyData>();
    migrater.registerMigration(3, (oldObject: any) => {
      return { _version: 4, key1: oldObject.key_1 };
    });

    const dataThatMightBeInOldFormat = {
      _version: 3,
      key_1: 'my value',
    } as any;
    const dataInNewFormat = migrater.run(
      dataThatMightBeInOldFormat,
      defaultData,
    );

    expect(dataInNewFormat).toEqual({ _version: 4, key1: 'my value' });
  });

  it('works for the other example in the docs', () => {
    class MyState {
      constructor(public _version: number) {}
    }
    class MessagingService {
      show = jasmine.createSpy();
    }

    class MigrationService extends MigrationManager<MyState> {
      constructor(private messaging: MessagingService) {
        super();
        this.registerMigration(1, this.migrateFrom1); // no special binding
      }

      private migrateFrom1(source: MyState) {
        this.messaging.show("You've been upgraded!"); // you can still use `this`
        return { ...source, _version: 2 };
      }
    }

    const messagingService = new MessagingService();
    const migrater = new MigrationService(messagingService);
    migrater.run(new MyState(1), new MyState(2));
    expectSingleCallAndReset(messagingService.show, "You've been upgraded!");
  });

  describe('.run', () => {
    it('can upgrade multiple versions', () => {
      class State {
        counter = 0;
        constructor(public _version: number) {}
      }
      const migrater = new MigrationManager<State>();
      migrater.registerMigration(1, (source) => ({
        _version: 2,
        counter: source.counter + 1,
      }));
      migrater.registerMigration(2, (source) => ({
        _version: 3,
        counter: source.counter + 1,
      }));
      expect(migrater.run(new State(1), new State(3))).toEqual({
        _version: 3,
        counter: 2,
      });
    });

    it('can handle skipping migrations', () => {
      class State {
        counter = 0;
        constructor(public _version: number) {}
      }
      const migrater = new MigrationManager<State>();
      migrater.registerMigration(1, (source) => ({
        _version: 3,
        counter: source.counter + 1,
      }));
      migrater.registerMigration(2, () => {
        throw new Error('should not be called');
      });
      expect(migrater.run(new State(1), new State(3))).toEqual({
        _version: 3,
        counter: 1,
      });
    });

    it("errs when a migration doesn't bump the version (instead of e.g. infinitely looping)", () => {
      class State {
        constructor(public _version: number) {}
      }
      const migrater = new MigrationManager<State>();
      migrater.registerMigration(1, () => ({ _version: 1 }));
      expect(() => {
        migrater.run(new State(1), new State(2));
      }).toThrowError('1 to 1 is not an upgrade...');
    });
  });

  describe('.registerMigration()', () => {
    it('calls the migration with `this` context', () => {
      class State {
        constructor(public _version: number) {}
      }
      const migration = jasmine.createSpy().and.returnValue(new State(2));
      const migrater = new MigrationManager<State>();
      migrater.registerMigration(1, migration);
      migrater.run(new State(1), new State(2));
      expect(migration.calls.first().object).toBe(migrater);
    });
  });

  describe('.onError()', () => {
    it('propagates the error by default', () => {
      class State {
        constructor(public _version: number) {}
      }
      const migrater = new MigrationManager<State>();
      const error = new Error();
      migrater.registerMigration(1, () => {
        throw error;
      });
      expect(() => {
        migrater.run(new State(1), new State(2));
      }).toThrow(error);
    });

    it('causes `reference` to be returned if overridden', () => {
      class State {
        constructor(public _version: number) {}
      }
      const migrater = new (class extends MigrationManager<State> {
        protected onError() {}
      })();
      migrater.registerMigration(1, () => {
        throw new Error();
      });
      const reference = new State(2);
      expect(migrater.run(new State(1), reference)).toBe(reference);
    });
  });
});
