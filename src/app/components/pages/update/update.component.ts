import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../../services/book-service.service'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  title = new FormControl('',[Validators.required])
  description = new FormControl('',[Validators.required])
  author = new FormControl('',[Validators.required])
  publishedDate = new FormControl('',[Validators.required])
  category = new FormControl('',[Validators.required])

  id: string;
  isSelected: boolean;

  updateForm: FormGroup = this.builder.group({
    title: this.title,
    description: this.description,
    author: this.author,
    publishedDate: this.publishedDate,
    category: this.category
  });

  constructor(private bookService: BookServiceService,
    private route: ActivatedRoute, private builder: FormBuilder) {
  }

  ngOnInit(): void {

    // get the id from route 
    const id = this.route.snapshot.paramMap.get('id');

    let books = [];

    books = JSON.parse(localStorage.getItem("BookStore"));

    const found = books.find(book =>
      book.id === id
    );

    // update input forms based on found object
    this.id = id;
    this.isSelected = found.isSelected;
    this.updateForm.controls['title'].patchValue(found.bookTitle);
    this.updateForm.controls['description'].patchValue(found.bookDescription);
    this.updateForm.controls['author'].patchValue(found.bookAuthor);
    this.updateForm.controls['publishedDate'].patchValue(found.publishDate);
    this.updateForm.controls['category'].patchValue(found.bookCategory);

  }

  updateBook() {

    
    // construct new book object
    const updatedBook = {
      id: this.id,
      bookTitle: this.updateForm.value.title,
      bookDescription: this.updateForm.value.description,
      bookAuthor: this.updateForm.value.author,
      publishDate: this.updateForm.value.publishedDate,
      bookCategory: this.updateForm.value.category,
      isSelected: this.isSelected
    }
    this.bookService.updateBook(updatedBook);
  }

  goHome(): void {
    this.bookService.goHome();
  }

}
