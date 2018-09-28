import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskAirpsComponent } from './ask-airps.component';

describe('AskAirpsComponent', () => {
  let component: AskAirpsComponent;
  let fixture: ComponentFixture<AskAirpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskAirpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskAirpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
