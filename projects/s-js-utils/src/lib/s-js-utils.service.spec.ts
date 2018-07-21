import { TestBed, inject } from '@angular/core/testing';

import { SJsUtilsService } from './s-js-utils.service';

describe('SJsUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SJsUtilsService]
    });
  });

  it('should be created', inject([SJsUtilsService], (service: SJsUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
