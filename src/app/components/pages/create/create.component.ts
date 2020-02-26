import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../../services/book-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title = new FormControl('', [Validators.required])
  description = new FormControl('', [Validators.required])
  author = new FormControl('', [Validators.required])
  publishedDate = new FormControl('', [Validators.required])
  category = new FormControl('', [Validators.required])

  createForm: FormGroup = this.builder.group({
    title: this.title,
    description: this.description,
    author: this.author,
    publishedDate: this.publishedDate,
    category: this.category
  });

  constructor(private builder: FormBuilder, private bookService: BookServiceService) {

  }


  submitBook(): void {

    // Generate Random Unique ID
    let id = '_' + Math.random().toString(36).substr(2, 9);

    // construct new book object

    const newBook = {
      id: id,
      bookTitle: this.createForm.value.title,
      bookDescription: this.createForm.value.description,
      bookAuthor: this.createForm.value.author,
      publishDate: this.createForm.value.publishedDate,
      bookCategory: this.createForm.value.category,
      isSelected: false
    }

    // Send object to service for subbmit

    this.bookService.addBook(newBook);


  }

  goHome(): void {
    this.bookService.goHome();
  }

  ngOnInit(): void {

  }

}
