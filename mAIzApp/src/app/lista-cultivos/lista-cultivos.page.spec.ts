import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaCultivosPage } from './lista-cultivos.page';

describe('ListaCultivosPage', () => {
  let component: ListaCultivosPage;
  let fixture: ComponentFixture<ListaCultivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCultivosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCultivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
