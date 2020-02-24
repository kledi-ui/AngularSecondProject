import { Component, OnInit } from "@angular/core";
import { BookServiceService } from '../../services/book-service.service'
import { IBook } from 'src/app/models/book';

@Component({
  selector: "app-table-configuration",
  templateUrl: "./table-configuration.component.html",
  styleUrls: ["./table-configuration.component.css"]
})
export class TableConfigurationComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor(private bookService: BookServiceService) { }

  listOfBooks: IBook[];
  selectedBooks: IBook[] = [];


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [10, 20, 30],

      columnDefs: [
        {
          targets: 2,
          orderable: false,
          searchable: false
        },
        {
          targets: 5,
          orderable: false
        },
        {
          targets: 0,
          orderable: false
        }
      ],

    };
    // Get data from local storage 
    this.listOfBooks = this.bookService.getAllBooks();


  }
  toggleClick(book: IBook): void {
    // change the boolean of object book on toogle
    book.isSelected = !book.isSelected;

    // add or remove selected book into an new array
    if (book.isSelected === true) {
      this.selectedBooks.push(book);
    } else {
      let index = this.selectedBooks.findIndex(item => item.id === book.id)
      this.selectedBooks.splice(index, 1)
    }

  }

  deleteSelectedFiles(): void {
    // intialize a confirm dialog to make sure on deleted request
    let confirmDialog = confirm(`Are u sure to delete ${this.selectedBooks.length} selected files`);
    if (confirmDialog == true) {
      // update local storage
      this.bookService.deleteSelectedFiles(this.selectedBooks);
      this.listOfBooks = this.bookService.getAllBooks();
      this.selectedBooks = [];
    }

  }


}
