import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actors} from '../core/models/actors';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.scss']
})
export class ActorItemComponent implements OnInit {
  @Input() actors: Actors;
  imgPath: string;
  midImgPath: string;
  popularityList = [1, 2, 3, 4, 5];

  @Output() makeFavorite = new EventEmitter<number>();

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.imgPath = this.apiService.config.imgPath;
    this.midImgPath = this.apiService.config.midImgPath;
  }

  buildImgUrl(url) {
    return this.midImgPath + url;
  }

  setPop(val) {
    return (val - val % 5) / 5;
  }

  addToFavorite() {
    this.makeFavorite.emit(this.actors.id);
  }
}

