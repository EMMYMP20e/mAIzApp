import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormCultivoPage } from './form-cultivo.page';

describe('FormCultivoPage', () => {
  let component: FormCultivoPage;
  let fixture: ComponentFixture<FormCultivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCultivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCultivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
