import { Injectable } from '@angular/core';
import { IBook } from '../models/book';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class BookServiceService {

  constructor(private router: Router) {

  }

  getAllBooks(): IBook[] {

    if (JSON.parse(localStorage.getItem("BookStore")) === null) {
      localStorage.setItem("BookStore", JSON.stringify([]));
      return [];
    } else {
      return JSON.parse(localStorage.getItem("BookStore"));
    }

  }

  // Enter new Book on the local Storage
  addBook(newBook) {
    // First we check for local storage items
    if (JSON.parse(localStorage.getItem("BookStore")) === null) {
      localStorage.setItem("BookStore", JSON.stringify([]));
    } else {
      let books = [];
      books = JSON.parse(localStorage.getItem("BookStore"));

      // Insert new book to local storage 
      books.push(newBook);
      localStorage.setItem("BookStore", JSON.stringify(books));
      // Route back to home page
      this.router.navigateByUrl('/');
    }
  }
  updateBook(newBook) {
    let books = [];
    books = JSON.parse(localStorage.getItem("BookStore"));
    // find index of the current book 
    let index = books.findIndex(item => item.id === newBook.id)
    books.splice(index, 1, newBook)
    // update local storage
    localStorage.setItem("BookStore", JSON.stringify(books));
    // route back to home page
    this.router.navigateByUrl('/');

  }

  
  deleteSelectedFiles(selectedBooks: IBook[]) {

    let books = [];
    books = JSON.parse(localStorage.getItem("BookStore"));

    // filter through arrays to find the same id and return the oposite object
    let filteredArray = books.filter((array_el) => {
      return selectedBooks.filter((anotherOne_el) => {
        return anotherOne_el.id == array_el.id;
      }).length == 0
    });

    //  set local storage with the filtered array 
    localStorage.setItem("BookStore", JSON.stringify(filteredArray));
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

}
