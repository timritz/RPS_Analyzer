import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import 'hammerjs';
import * as $ from 'jquery'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  mc: any;
  element: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.element = document.getElementById("testDiv")
  }

  ngOnInit() {
    console.log("should be listening")
    $(document).ready(function(){
      console.log("Listening")
      $("#Title").click(function(){
        console.log("clicked dropdown")
        $("#DropDownList").slideToggle()
      })
    })

  }

  HelloWorld(){
    console.log("hello World")
  }

  swipeLeft(){
    console.log("Swiped left")
    this._router.navigate(['/play'])
  }

  swipeRight(){
    console.log("Swiped right")
    this._router.navigate(['/ask'])
  }

  tapUpdate(){
    console.log("Tap Update")
    this._router.navigate(['/update'])
  }

  tapStats(){
    console.log("Tap Stats")
    this._router.navigate(['/stats'])
  }
  
  MenuHome(){
    $("#DropDownList").slideUp()
    this._router.navigate(['/'])
  }
  MenuAsk(){
    $("#DropDownList").slideUp()
    this._router.navigate(['/ask'])
  }
  MenuPlay(){
    $("#DropDownList").slideUp()
    this._router.navigate(['/play'])
  }
  MenuUpdate(){
    $("#DropDownList").slideUp()
    this._router.navigate(['/update'])
  }
  MenuData(){
    $("#DropDownList").slideUp()
    this._router.navigate(['/stats'])
  }
  

  

}
