import { Component, OnInit } from '@angular/core';
import {BookServiceService} from '../../../services/book-service.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id:string;
  title:string;
  description:string;
  author:string;
  publishedDate:string;
  category:string;
  isSelected:boolean;

  constructor(private bookService:BookServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    let books =[];

    books = JSON.parse(localStorage.getItem("BookStore"));

    const found = books.find(book=>
    book.id === id
    );
    
    this.id=id;
    this.title=found.bookTitle;
    this.description=found.bookDescription;
    this.author=found.bookAuthor;
    this.publishedDate=found.publishDate;
    this.category=found.bookCategory;
    this.isSelected=found.isSelected;

  }

  updateBook(){

    // construct new book object
    const updatedBook = {
      id:this.id,
      bookTitle:this.title,
      bookDescription:this.description,
      bookAuthor:this.author,
      publishDate:this.publishedDate,
      bookCategory:this.category,
      isSelected:this.isSelected
    }

    this.bookService.updateBook(updatedBook);
    
  }

  goHome():void{
    this.bookService.goHome();
      }

}
