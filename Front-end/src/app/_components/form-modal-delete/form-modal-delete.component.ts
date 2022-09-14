import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-form-modal-delete',
  templateUrl: './form-modal-delete.component.html',
  styleUrls: ['./form-modal-delete.component.css']
})
export class FormModalDeleteComponent implements OnInit {
  @Input() dsObj: [];
  @Input() objName: string;
  // @Input() columns: [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
