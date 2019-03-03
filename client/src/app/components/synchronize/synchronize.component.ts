import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-synchronize',
  templateUrl: './synchronize.component.html',
  styleUrls: ['./synchronize.component.css']
})
export class SynchronizeComponent implements OnInit {

  response:any[] = [];
  isOk:boolean;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
  }

  synchronizeApp(){
    this.http.get('http://localhost:4201/api/news/synchronize').subscribe( (resp:any) => {
      this.response = resp;
      console.log(this.response);
    });
  }

}
