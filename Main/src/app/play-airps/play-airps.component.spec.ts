import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAirpsComponent } from './play-airps.component';

describe('PlayAirpsComponent', () => {
  let component: PlayAirpsComponent;
  let fixture: ComponentFixture<PlayAirpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayAirpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAirpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
