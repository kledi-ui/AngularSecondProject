import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { IBook } from 'src/app/models/book';
import {BookServiceService} from '../../../services/book-service.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() addBook: EventEmitter<any> = new EventEmitter();

  title:string;
  description:string;
  author:string;
  publishedDate:string;
  category:string;

  constructor(private bookService:BookServiceService) { }

  ngOnInit(): void {

  }

  submitBook():void{

    // Generate Random Unique ID
    let id = '_' + Math.random().toString(36).substr(2, 9);

    // construct new book object
    const newBook = {
      id:id,
      bookTitle:this.title,
      bookDescription:this.description,
      bookAuthor:this.author,
      publishDate:this.publishedDate,
      bookCategory:this.category,
      isSelected:false
    }
    // Get all books from local storage

    this.bookService.addBook(newBook);

  }
  goHome():void{
this.bookService.goHome();
  }

}
