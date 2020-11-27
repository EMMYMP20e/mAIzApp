import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListRegistrosPage } from './list-registros.page';

describe('ListRegistrosPage', () => {
  let component: ListRegistrosPage;
  let fixture: ComponentFixture<ListRegistrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRegistrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListRegistrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
