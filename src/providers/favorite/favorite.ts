import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Dish } from '../../shared/dish';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';
/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any> = [];

  constructor(public http: Http,
    private dishservice: DishProvider,
    private storage: Storage,
    private localNotifications: LocalNotifications) {

    console.log('fetching favorites')
    this.storage.get('favorites').then(favorites => {
      if (favorites) {
        this.favorites = favorites;
        console.log('fetching favorites ok')

      }
      else
        this.favorites = [];
    });
  }


  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }
  addFavorite(id: number): boolean {

    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);
     
      // Schedule a single notification
      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite successfully'
      });
    }

    return true;
  }

  getFavorites(): Observable<Dish[]> {
    return Observable.fromPromise(this.storage.get('favorites')).mergeMap(resFavorites => {
      if (resFavorites)
        this.favorites = resFavorites;
      return this.dishservice.getDishes()
        .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
    });
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites)

      return this.getFavorites();
    }
    else {
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}

