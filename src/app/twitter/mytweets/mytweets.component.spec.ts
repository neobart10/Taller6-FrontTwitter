import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytweetsComponent } from './mytweets.component';

describe('MytweetsComponent', () => {
  let component: MytweetsComponent;
  let fixture: ComponentFixture<MytweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
