import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsManagementComponent } from './wallets-management.component';

describe('WalletsManagementComponent', () => {
  let component: WalletsManagementComponent;
  let fixture: ComponentFixture<WalletsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
