import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAirpsComponent } from './update-airps.component';

describe('UpdateAirpsComponent', () => {
  let component: UpdateAirpsComponent;
  let fixture: ComponentFixture<UpdateAirpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAirpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAirpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
