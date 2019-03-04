import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import configGlobal = require("../../../../../global.config.json");

@Component({
  selector: 'app-synchronize',
  templateUrl: './synchronize.component.html',
  styleUrls: ['./synchronize.component.css']
})
export class SynchronizeComponent implements OnInit {

  response:any[];
  isOk:boolean;
  message:String;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
  }

  synchronizeApp(){
    this.http.get(`${ configGlobal.server_host }:${ configGlobal.server_port }/api/news/synchronize`).subscribe( (resp:any) => {
      this.response = resp;
      console.log(this.response);
      this.message = resp.message;
      this.isOk = resp.ok;
    },
    (err:any) => {
      console.log('error', err);
    }, () => {
      console.log('complete');
    });
  }

}
