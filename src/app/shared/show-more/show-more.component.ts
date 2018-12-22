import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.scss']
})
export class ShowMoreComponent implements OnInit {
  @Input() totalPages;
  @Output() pageEmitter = new EventEmitter();
  pageCounter = 1;
  end = false;

  constructor() { }

  ngOnInit() {
  }
  getNextPage() {
    this.pageCounter += 1;
    this.pageEmitter.emit(this.pageCounter);
  }
}
