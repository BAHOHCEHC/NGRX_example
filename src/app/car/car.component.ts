import {Component, Input} from '@angular/core'
import {Car} from '../car.model'
import {CarsService} from '../cars.service'

@Component({
  selector: 'app-car',
  template: `
    <div
      class="list-group-item flex-column align-items-start"
      [ngClass]="{
        'list-group-item-danger': car.isSold
      }"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ car.name }}</h5>
        <small>{{ car.date }}</small>
      </div>
      <p class="mb-1">
        {{ car.model }}
      </p>
      <div class="row justify-content-md-center">
        <div class="col col-lg-12">
          <button (click)="onDelete()" type="button" class="btn btn-danger btn-sm">
            Delete
          </button>
          <button (click)="onBuy()" [disabled]="car.isSold" type="button" class="btn btn-success btn-sm">
            Buy
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input() car: Car;

  constructor(private service: CarsService) {}

  onDelete() {
    this.service.deleteCar(this.car);
  }

  onBuy() {
    this.car.isSold = true;
    this.service.updateCar(this.car);
  }
}
