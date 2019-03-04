import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { HttpClient } from "@angular/common/http";
import configGlobal = require("../../../../../global.config.json");


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news:any[];
  messages:any[] = [];

  constructor( public dialog: MatDialog, private http: HttpClient ) { 

    this.http.get(`${ configGlobal.server_host }:${ configGlobal.server_port }/api/news/`).subscribe((resp:any)=> {
      if( resp.ok == false ){
        this.messages = resp.err;
      } else {
        this.news = resp.news.sort( (val1:any, val2:any) => <any>new Date(val2.date) - <any>new Date(val1.date));
        console.log(this.messages);
      }
    },
    (err:any) => {
      console.log('error', err);
    }, () => {
      console.log('complete');
    });

  }

  openDialog(event: any, id: Number): void {
    event.preventDefault();
    console.log(id);
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.http.get(`${ configGlobal.server_host }:${ configGlobal.server_port }/api/news/delete-view/${ id }`).subscribe((resp:any)=> {
          if( resp.ok == false ){
            this.messages = resp.err;
          } else {
            for (let index = 0; index < this.news.length; index++) {
              if(this.news[ index ].new_id == id){
                this.news[ index ].is_delete = true;
                console.log(this.news[ index ].is_delete); 
              }
            }
            console.log(this.messages);
          }
        },
        (err:any) => {
          console.log('error', err);
        }, () => {
          console.log('complete');
        });
      }
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

