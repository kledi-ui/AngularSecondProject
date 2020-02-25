import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BookServiceService } from '../../../services/book-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() addBook: EventEmitter<any> = new EventEmitter();

  title: string;
  description: string;
  author: string;
  publishedDate: string;
  category: string;
  alertMessage: boolean = false;
  

  constructor(private bookService: BookServiceService) {
  }

  ngOnInit(): void {

  }


  submitBook(): void {

    // Generate Random Unique ID
    let id = '_' + Math.random().toString(36).substr(2, 9);

    // Stop here if form is invalid

    if (this.title === undefined 
       || 
       this.description === undefined 
       || this.author === undefined 
       || this.publishedDate === undefined
       || this.category === undefined) {

      this.alertMessage = true;

    } else {

      // construct new book object

      const newBook = {
        id: id,
        bookTitle: this.title,
        bookDescription: this.description,
        bookAuthor: this.author,
        publishDate: this.publishedDate,
        bookCategory: this.category,
        isSelected: false
      }
      // Send object to service for subbmit
      this.bookService.addBook(newBook);
    }

  }

  goHome(): void {
    this.bookService.goHome();
  }

}
