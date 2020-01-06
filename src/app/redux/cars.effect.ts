import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddCar, CAR_ACTION } from './cars.action';
import { Car } from '../car.model';
import { CarsService } from '../cars.service';
import { switchMap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class CarsEffect {
  constructor(private actions$: Actions, private service: CarsService) {}

  @Effect() loadCars = this.actions$.pipe(
    ofType(CAR_ACTION.ADD_CAR),
    switchMap((action: AddCar) => {
      return this.service.preloadCars();
    }),
    mergeMap((cars: Car[]) => {
      return [
        {
          type: CAR_ACTION.LOAD_CARS,
          payload: cars
        }
      ];
    })
  )
}
