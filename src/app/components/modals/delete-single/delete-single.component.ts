import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBook } from 'src/app/models/book';
import {BookServiceService} from '../../../services/book-service.service'
@Component({
  selector: 'app-delete-single',
  templateUrl: './delete-single.component.html',
  styleUrls: ['./delete-single.component.css']
})
export class DeleteSingleComponent implements OnInit {


  @Input() book:IBook;
  @Output() filteredArray: EventEmitter<any> = new EventEmitter();

  constructor(config: NgbModalConfig, private modalService: NgbModal,private bookService:BookServiceService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

  onDelete(){
    
    const array = this.bookService.deleteOneBook(this.book);

    this.filteredArray.emit(array);
    this.modalService.dismissAll();

    
  }
  

}
