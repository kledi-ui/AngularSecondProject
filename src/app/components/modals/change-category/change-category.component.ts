import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal ,} from '@ng-bootstrap/ng-bootstrap';
import { IBook } from 'src/app/models/book';
import {BookServiceService} from '../../../services/book-service.service'

@Component({
  selector: 'app-change-category',
  templateUrl: './change-category.component.html',
  styleUrls: ['./change-category.component.css']
})
export class ChangeCategoryComponent implements OnInit {

  
  @Input() selectedBooks:IBook[];
  @Output() filteredArrayCategory: EventEmitter<any> = new EventEmitter();

  category:string;
  alertMessage:boolean=false;
  constructor(config: NgbModalConfig, private modalService: NgbModal,private bookService:BookServiceService) { 
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
  }

  ngOnInit(): void {

  }
  open(content) {
    this.modalService.open(content);
  }
  onChange(){
    if(this.category === undefined){

      this.alertMessage=true;

    } else {
      this.selectedBooks.map(book=>{
        book.bookCategory=this.category;
      });
      
      const array = this.bookService.changeCategory(this.selectedBooks);
      this.filteredArrayCategory.emit(array);
      this.modalService.dismissAll();
    }
   
  }

}
