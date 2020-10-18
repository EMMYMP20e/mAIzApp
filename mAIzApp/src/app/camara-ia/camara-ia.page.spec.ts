import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamaraIaPage } from './camara-ia.page';

describe('CamaraIaPage', () => {
  let component: CamaraIaPage;
  let fixture: ComponentFixture<CamaraIaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamaraIaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamaraIaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
