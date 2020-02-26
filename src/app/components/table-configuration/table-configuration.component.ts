import { Component, OnInit , ViewChild} from "@angular/core";
import { BookServiceService } from '../../services/book-service.service'
import { DataTableDirective } from 'angular-datatables';
import { IBook } from 'src/app/models/book';
import { Subject } from 'rxjs';

@Component({
  selector: "app-table-configuration",
  templateUrl: "./table-configuration.component.html",
  styleUrls: ["./table-configuration.component.css"]
})
export class TableConfigurationComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<TableConfigurationComponent> = new Subject();

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

  // Datatable methods
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
 // Datatable methods

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
      // update ui 
      this.listOfBooks = this.bookService.getAllBooks();
      // empty selected books
      this.selectedBooks = [];
      // render table data
      this.rerender();
    }
  }

  // filtered array after deleting a single record

  filteredArray(filteredArray:IBook[]):void{
   // set local storage with the new filtered arrays
    localStorage.setItem('BookStore',JSON.stringify(filteredArray));
    this.listOfBooks = this.bookService.getAllBooks();
    this.rerender();
    
  }

  // filtered array after changing the category on specific records

  filteredArrayCategory(filteredArray:IBook[]):void{
    // update list of books on ui
    this.listOfBooks=filteredArray;
     // empty selected array list
     this.selectedBooks = [];
    // set local storage with the new filtered arrays
    localStorage.setItem('BookStore',JSON.stringify(filteredArray));
    this.rerender();

  }

  // Data table rerender method when we make changes on local storage
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


}
