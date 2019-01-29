import { MassageService } from './../massage.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-massages',
  templateUrl: './massages.component.html',
  styleUrls: ['./massages.component.css']
})
export class MassagesComponent implements OnInit {

  constructor(public massageService: MassageService) { }

  ngOnInit() {
  }

}
