import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchMakeSource = new Subject<string>();
  public searchMake$ = this.searchMakeSource.asObservable();

  constructor() {}

  makeSearch(text: string) {
    this.searchMakeSource.next(text);
  }
}
