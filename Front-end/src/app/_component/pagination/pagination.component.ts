import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  private _collectionSize: number;

  @Input() set collectionSize(value: number) {
    this._collectionSize = value;
    this.calMaxPage();
  }
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Output() currentPageChange = new EventEmitter();
  @Output() itemsPerPageChange = new EventEmitter();
  @Output() paginationChange = new EventEmitter();
  maxPage: number;
  lastPage: number;

  constructor() { }

  ngOnInit(): void {
    this.calMaxPage();
    this.lastPage = this.currentPage;
  }

  onItemsPerPageChange(newItemsPerPage: string): void {
    this.itemsPerPage = parseInt(newItemsPerPage, 10);
    this.selectPage("1");
    this.calMaxPage();
    this.itemsPerPageChange.emit(this.itemsPerPage);
    this.paginationChange.emit();
  }

  selectPage(page: string) {
    debugger
    if (page.length == 0) {
      this.currentPage = this.lastPage;
    } else {
      let pageNumber = parseInt(page);
      if (pageNumber > this.maxPage) this.currentPage = this.maxPage;
      else if (pageNumber < 1) this.currentPage = 1;
      else this.currentPage = pageNumber;
    }
    if (this.currentPage != this.lastPage) {
      this.lastPage = this.currentPage;
      this.currentPageChange.emit(this.currentPage);
      this.paginationChange.emit();
    } 
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  calMaxPage(): void {
    this.maxPage = Math.ceil(this._collectionSize / this.itemsPerPage);
  }
}
