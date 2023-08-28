import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(msg:string,action:string = 'Ok', vpos:MatSnackBarVerticalPosition = 'top', hpos:MatSnackBarHorizontalPosition = 'center'){
    this._snackBar.open(msg, action, {
      duration:5000,
      verticalPosition:vpos,
      horizontalPosition:hpos,
    });
  }
}
