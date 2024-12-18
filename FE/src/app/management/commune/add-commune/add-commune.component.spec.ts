import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommuneComponent } from './add-commune.component';

describe('AddCommuneComponent', () => {
  let component: AddCommuneComponent;
  let fixture: ComponentFixture<AddCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCommuneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
