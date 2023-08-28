import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent {
  status: string = '';
  bookForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder, private core: CoreService) {
    this.bookForm = this.fb.group({
      bookId: fb.control('', [Validators.required]),
      userId: fb.control('', [Validators.required]),
    });
  }

  returnBook() {
    let book = (this.bookForm.get('bookId') as FormControl).value;
    let user = (this.bookForm.get('userId') as FormControl).value;
    this.api.returnBook(book, user).subscribe({
      next: (res: any) => {
        if (res === 'success'){
          this.core.openSnackBar('Book Returned!');
          this.status = 'Book Returned!';
      }
        else {
          this.core.openSnackBar(res);
          this.status = res;
        }
      },
      error: (err: any) => console.log(err),
    });
  }
}