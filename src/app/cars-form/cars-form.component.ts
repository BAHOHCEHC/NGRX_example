import {Component} from '@angular/core'
import * as moment from 'moment'
import {Car} from '../car.model'
import {CarsService} from '../cars.service'

@Component({
  selector: 'app-cars-form',
  template: `
    <div class="form-group">
      <label for="car-name">Car name</label>
      <input type="text" class="form-control" id="car-name" [(ngModel)]="carName" placeholder="Car Name" />
    </div>

    <div class="form-group">
      <label for="car-model">Car model</label>
      <input type="text" class="form-control" id="car-model" [(ngModel)]="carModel" placeholder="Car Model" />
    </div>

    <button type="button" (click)="onAdd()" class="btn btn-outline-primary">Add Car</button>
    <button type="button" (click)="onLoad()" class="btn btn-outline-warning">Load Cars</button>
  `,
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent {
  carName: string = '';
  carModel: string = '';

  constructor(private service: CarsService) {}

  onAdd() {
    if (this.carModel === '' || this.carName === '') return;

    const date = moment().format('DD.MM.YY');
    const car = new Car(this.carName, date, this.carModel);

    this.service.addCar(car);

    this.carModel = '';
    this.carName = '';
  }

  onLoad() {
    this.service.loadCars();
  }
}
