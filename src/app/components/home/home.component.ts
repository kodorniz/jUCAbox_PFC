import { Component, OnInit } from '@angular/core';
import { JucaboxService } from '../../services/jucabox.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  constructor( public _jucaboxService: JucaboxService) {

  //  _jucaboxService.getPublic().subscribe(data=>{console.log(data)});
   }

  ngOnInit() {
  }

}
