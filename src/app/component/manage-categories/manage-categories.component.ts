import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent  {
  categoryForm: FormGroup;
  msg: string = '';

  constructor(private fb: FormBuilder, private api: ApiService, private core:CoreService) {
    this.categoryForm = this.fb.group({
      category: this.fb.control('', [Validators.required]),
      subcategory: this.fb.control('', [Validators.required]),
    });
  }

  addNewCategory() {
    let c = this.Category.value;
    let s = this.Subcategory.value;

    this.api.insertCategory(c, s).subscribe({
      next: (res: any) => {
        this.msg = res.toString();
        this.core.openSnackBar(res.toString);
        setInterval(() => (this.msg = ''), 5000);
        this.Category.setValue('');
        this.Subcategory.setValue('');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  get Category(): FormControl {
    return this.categoryForm.get('category') as FormControl;
  }
  get Subcategory(): FormControl {
    return this.categoryForm.get('subcategory') as FormControl;
  }
}
