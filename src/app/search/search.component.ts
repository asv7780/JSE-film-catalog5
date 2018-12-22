import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText = '';

  constructor(
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
  }

  onSearch() {
    this.searchService.makeSearch(this.searchText);
    this.searchText = '';
  }
}
