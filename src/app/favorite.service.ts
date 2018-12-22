import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  filmsFavoriteList: Array<number> = [];
  filmsBookmarkList: Array<number> = [];
  actorsFavoriteList: Array<number> = [];

  constructor() {
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage() {
    const filmsFavoriteStorageValue = localStorage.getItem('filmsFavoriteList');
    if (filmsFavoriteStorageValue) {
      this.filmsFavoriteList = filmsFavoriteStorageValue
        .split(',')
        .map(item => Number.parseInt(item, 10));
    }
    const filmsBookmarkStorageValue = localStorage.getItem('filmsBookmarkList');
    if (filmsBookmarkStorageValue) {
      this.filmsBookmarkList = filmsBookmarkStorageValue
        .split(',')
        .map(item => Number.parseInt(item, 10));
    }
    const actorsFavoriteStorageValue = localStorage.getItem('actorsFavoriteList');
    if (actorsFavoriteStorageValue) {
      this.actorsFavoriteList = actorsFavoriteStorageValue
        .split(',')
        .map(item => Number.parseInt(item, 10));
    }
  }

  getFilmsFavorite() {
    return this.filmsFavoriteList;
  }

  getFilmsBookmark() {
    return this.filmsBookmarkList;
  }

  getActorsFavorite() {
    return this.actorsFavoriteList;
  }

  addFilmToFavorite(id: number) {
    this.filmsFavoriteList.push(id);
    this.saveData();
  }

  addFilmToBookmarks(id: number) {
    this.filmsBookmarkList.push(id);
    this.saveData();
  }

  addActorsToFavorite(id: number) {
    this.actorsFavoriteList.push(id);
    this.saveData();
  }

  removeFilmFromFavorites(id: number) {
    const index = this.filmsFavoriteList.indexOf(id);
    if (index > -1) {
      this.filmsFavoriteList.splice(index, 1);
    }
    this.saveData();
  }

  removeFilmFromBookmarks(id: number) {
    const index = this.filmsBookmarkList.indexOf(id);
    if (index > -1) {
      this.filmsBookmarkList.splice(index, 1);
    }
    this.saveData();
  }

  removeActorsFromFavorites(id: number) {
    const index = this.actorsFavoriteList.indexOf(id);
    if (index > -1) {
      this.actorsFavoriteList.splice(index, 1);
    }
    this.saveData();
  }

  saveData() {
    localStorage.setItem('filmsFavoriteList', this.filmsFavoriteList.join());
    localStorage.setItem('filmsBookmarkList', this.filmsBookmarkList.join());
    localStorage.setItem('actorsFavoriteList', this.actorsFavoriteList.join());
  }

}
