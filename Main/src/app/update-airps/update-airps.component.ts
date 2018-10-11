import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-update-airps',
  templateUrl: './update-airps.component.html',
  styleUrls: ['./update-airps.component.css']
})
export class UpdateAirpsComponent implements OnInit {
  userPicked: any;
  oppPicked: any;


  currentAction: any;
  UserChoice: any;
  OppChoice: any;

  rockStyle1: any;
  paperStyle1: any;
  scissorsStyle1: any;

  rockStyle2: any;
  paperStyle2: any;
  scissorsStyle2: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,) { }

  ngOnInit() {
    this.getData("5bab9fe1631c7a4950085d9f")

    // console.log("should be listening")
    $(document).ready(function(){
      // console.log("Listening")

     

      $("#Title").click(function(){
        // console.log("clicked dropdown")
        $("#DropDownList").slideToggle()
      })
      

    })
  }

  getData(id: any){
    const tempObservable = this._httpService.getSingleAction(id)
    tempObservable.subscribe(data=>{
      console.log("data", data[0])
      this.currentAction = data[0]
    })
  }

  getNext(userChoice: any, oppChoice: any){
    let option = "";
    let result = "" ;
    if(userChoice == "rock"){
      option = "rock"
      if(oppChoice == "rock"){
        result = "tied"
        this.currentAction[option].ties ++;
      }else if(oppChoice == "paper"){
        result = "won"
        this.currentAction[option].wins ++;
      }else if(oppChoice == "scissors"){
        result = "lost"
        this.currentAction[option].losses ++;
      }
    }else if(userChoice == "paper"){
      option = "paper"
      if(oppChoice == "rock"){
        result = "won"
        this.currentAction[option].wins ++;
      }else if(oppChoice == "paper"){
        result = "tied"
        this.currentAction[option].ties ++;
      }else if(oppChoice == "scissors"){
        result = "lost"
        this.currentAction[option].losses ++;
      }
    }else if(userChoice == "scissors"){
      option = "scissors"
      if(oppChoice == "rock"){
        result = "lost"
        this.currentAction[option].losses ++;
      }else if(oppChoice == "paper"){
        result = "won"
        this.currentAction[option].wins ++;
      }else if(oppChoice == "scissors"){
        result = "tied"
        this.currentAction[option].ties ++;
      }
    }

    // console.log(result, " with ", option)
    // console.log("inside option", this.currentAction[option])
    // console.log("inside result", this.currentAction[option][result])

    if(this.currentAction[option][result]){
      const tempObservable = this._httpService.updateAction(this.currentAction._id, this.currentAction)
      tempObservable.subscribe(data=>{
        // console.log("updated current schema")
        this.getData(this.currentAction[option][result])
      })
    }else {
      const tempObservable = this._httpService.newAction()
      tempObservable.subscribe(data1=>{
        // console.log("made new action")
        // console.log('data1', data1)
        this.currentAction[option][result] = data1["_id"]
        // console.log('to be updated', this.currentAction)
        const tempObs2 = this._httpService.updateAction(this.currentAction._id, this.currentAction)
        tempObs2.subscribe(data2=>{
          // console.log("added action to parent")
          // console.log("data2", data2)
          this.getData(data1['_id'])
        })
      })
    }
  }

  // chooseRock(person: any){
  //   if(person == "user"){
  //     this.user_rock = true;
  //     this.user_paper = false;
  //     this.user_scissors = false;
  //     this.UserChoice = "rock";
  //   }else{
  //     this.opp_rock = true;
  //     this.opp_paper = false;
  //     this.opp_scissors = false;
  //     this.OppChoice = "rock";
  //   }
  // }
  // choosePaper(person: any){
  //   if(person == "user"){
  //     this.user_rock = false;
  //     this.user_paper = true;
  //     this.user_scissors = false;
  //     this.UserChoice = "paper";
  //   }else{
  //     this.opp_rock = false;
  //     this.opp_paper = true;
  //     this.opp_scissors = false;
  //     this.OppChoice = "paper";
  //   }
  // }
  // chooseScissors(person: any){
  //   if(person == "user"){
  //     this.user_rock = false;
  //     this.user_paper = false;
  //     this.user_scissors = true;
  //     this.UserChoice = "scissors";
  //   }else{
  //     this.opp_rock = false;
  //     this.opp_paper = false;
  //     this.opp_scissors = true;
  //     this.OppChoice = "scissors";
  //   }

  chooseRock(person: any){
    if(person == "user1"){
      this.userPicked = true;
      this.UserChoice = "rock";
      this.rockStyle1 = "yellow"
      this.paperStyle1 = "transparent"
      this.scissorsStyle1 = "transparent"
    }else if(person == "user2"){
      this.oppPicked = true;
      this.OppChoice = "rock";
      this.rockStyle2 = "yellow"
      this.paperStyle2 = "transparent"
      this.scissorsStyle2 = "transparent"
    }
  }
  choosePaper(person: any){
    if(person == "user1"){
      this.userPicked = true;
      this.UserChoice = "paper";
      this.rockStyle1 = "transparent"
      this.paperStyle1 = "yellow"
      this.scissorsStyle1 = "transparent"
    }else if(person == "user2"){
      this.oppPicked = true;
      this.OppChoice = "rock";
      this.rockStyle2 = "transparent"
      this.paperStyle2 = "yellow"
      this.scissorsStyle2 = "transparent"
    }
  }
  chooseScissors(person: any){
    if(person == "user1"){
      this.userPicked = true;
      this.UserChoice = "scissors";
      this.rockStyle1 = "transparent"
      this.paperStyle1 = "transparent"
      this.scissorsStyle1 = "yellow"
    }else if(person == "user2"){
      this.oppPicked = true;
      this.OppChoice = "rock";
      this.rockStyle2 = "transparent"
      this.paperStyle2 = "transparent"
      this.scissorsStyle2 = "yellow"
    }
  }
  

  resetbuttons(){
    this.rockStyle1 = "transparent"
    this.paperStyle1 = "transparent"
    this.scissorsStyle1 = "transparent"
    this.rockStyle2 = "transparent"
    this.paperStyle2 = "transparent"
    this.scissorsStyle2 = "transparent"
    this.oppPicked = false;
    this.userPicked = false;
  }

  submit(){
    // console.log("Got to submit")
    this.resetbuttons();
    this.getNext(this.UserChoice, this.OppChoice)
  }

  reset(){
    // console.log("Got to reset")
    this.resetbuttons()
    this.getData("5baa7c16a5f5161764025e59")
  }

  return(){
    // console.log("tapped return")
    this._router.navigate(['/'])
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
