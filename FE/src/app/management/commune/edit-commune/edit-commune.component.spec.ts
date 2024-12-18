import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommuneComponent } from './edit-commune.component';

describe('EditCommuneComponent', () => {
  let component: EditCommuneComponent;
  let fixture: ComponentFixture<EditCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCommuneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
