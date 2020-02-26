import { Injectable } from '@angular/core';
import { IBook } from '../models/book';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class BookServiceService {

  constructor(private router: Router) {

  }

  // get all books from local storage to update ui
  getAllBooks(): IBook[] {

    // if local storage is null set local storage and return empty array
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

  deleteOneBook(book: IBook): IBook[] {


    let books = [];
    books = JSON.parse(localStorage.getItem("BookStore"));
    // filter through books and return all elements not equa to book
    const filterdBooks = books.filter(element => {
      return element.id !== book.id
    });
    return filterdBooks;
  }
  changeCategory(selectedBooks: IBook[]): IBook[] {
    let books = [];
    books = JSON.parse(localStorage.getItem("BookStore"));

    // loop through selected books and intial books
    const filteredArray = books.map(book => {
      selectedBooks.map(book2 => {
        if (book2.id === book.id) {
          book.bookCategory = book2.bookCategory
        }
      })
      return book
    })
    return filteredArray;
  }

  // Navigate through code to home route
  goHome(): void {
    this.router.navigateByUrl('/');
  }

}
