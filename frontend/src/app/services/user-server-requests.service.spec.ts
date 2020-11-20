import { TestBed } from '@angular/core/testing';

import { UserServerRequestsService } from './user-server-requests.service';

describe('UserServerRequestsService', () => {
  let service: UserServerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
