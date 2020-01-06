import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { CarComponent } from './car/car.component';
import { CarsService } from './cars.service';
import { environment } from '../environments/environment.prod';

import { CarsEffect } from './redux/cars.effect';
import { carsReducer } from './redux/cars.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; //модуль работает с расширением в браузере
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [AppComponent, CarsFormComponent, CarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([CarsEffect]), //CarsEffect - class создается dispatcher-ом в observeble режиме
    StoreModule.forRoot(
      { carPage: carsReducer }, //carPage объект state в интерфейсе  appState из app.state.ts, carsReducer - главный редюсер
      { metaReducers } //metaReducers массив мета reducers для отладки
    ),
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument() //активация расширения
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
