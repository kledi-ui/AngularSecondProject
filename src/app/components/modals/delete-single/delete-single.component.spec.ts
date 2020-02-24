import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSingleComponent } from './delete-single.component';

describe('DeleteSingleComponent', () => {
  let component: DeleteSingleComponent;
  let fixture: ComponentFixture<DeleteSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
