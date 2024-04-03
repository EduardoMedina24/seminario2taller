import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NevelPage } from './nevel.page';

describe('NevelPage', () => {
  let component: NevelPage;
  let fixture: ComponentFixture<NevelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
