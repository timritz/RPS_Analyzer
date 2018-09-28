import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-play-airps',
  templateUrl: './play-airps.component.html',
  styleUrls: ['./play-airps.component.css']
})
export class PlayAirpsComponent implements OnInit {

  user_rock: any;
  user_paper: any;
  user_scissors: any;
  opp_rock : any;
  opp_paper : any;
  opp_scissors : any;

  currentAction: any;
  UserChoice: any;
  CompChoice: any;
  result: any;
  startId: any;

  rockStyle: any;
  paperStyle: any;
  scissorsStyle: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.startId = "5bab9fe1631c7a4950085d9f"
  }

  ngOnInit() {
    this.getData(this.startId)

    console.log("should be listening")
    $(document).ready(function(){
      console.log("Listening")

     

      $("#Title").click(function(){
        console.log("clicked dropdown")
        $("#DropDownList").slideToggle()
      })
      

    })
  }

  getData(id: any){
    const tempObservable = this._httpService.getSingleAction(id)
    tempObservable.subscribe(data=>{
      console.log("data", data[0])
      this.currentAction = data[0]
      this.analyzeOptions();
      this.rockStyle = "transparent"
      this.paperStyle = "transparent"
      this.scissorsStyle = "transparent"
      
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
        result = "lost"
        this.currentAction[option].wins ++;
      }else if(oppChoice == "scissors"){
        result = "won"
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

    console.log(result, " with ", option)
    console.log("inside option", this.currentAction[option])
    console.log("inside result", this.currentAction[option][result])

    this.result = result

    if(this.currentAction[option][result]){
      const tempObservable = this._httpService.updateAction(this.currentAction._id, this.currentAction)
      tempObservable.subscribe(data=>{
        console.log("updated current schema")
        this.getData(this.currentAction[option][result])
      })
    }else {
      const tempObservable = this._httpService.newAction()
      tempObservable.subscribe(data1=>{
        console.log("made new action")
        console.log('data1', data1)
        this.currentAction[option][result] = data1["_id"]
        console.log('to be updated', this.currentAction)
        const tempObs2 = this._httpService.updateAction(this.currentAction._id, this.currentAction)
        tempObs2.subscribe(data2=>{
          console.log("added action to parent")
          console.log("data2", data2)
          this.getData(data1['_id'])
        })
      })
    }
  }

  chooseRock(person: any){
    if(person == "user"){
      this.user_rock = true;
      this.user_paper = false;
      this.user_scissors = false;
      this.UserChoice = "rock";
      this.rockStyle = "yellow"
      this.paperStyle = "transparent"
      this.scissorsStyle = "transparent"
    }
  }
  choosePaper(person: any){
    if(person == "user"){
      this.user_rock = false;
      this.user_paper = true;
      this.user_scissors = false;
      this.UserChoice = "paper";
      this.rockStyle = "transparent"
      this.paperStyle = "yellow"
      this.scissorsStyle = "transparent"
    }
  }
  chooseScissors(person: any){
    if(person == "user"){
      this.user_rock = false;
      this.user_paper = false;
      this.user_scissors = true;
      this.UserChoice = "scissors";
      this.rockStyle = "transparent"
      this.paperStyle = "transparent"
      this.scissorsStyle = "yellow"
    }
  }

  resetbuttons(){
    this.user_rock = false;
    this.user_paper = false;
    this.user_scissors = false;
    this.opp_rock = false;
    this.opp_paper = false;
    this.opp_scissors = false;
  }

  submit(){
    console.log("Got to submit")
    this.resetbuttons();
    this.getNext(this.UserChoice, this.CompChoice)
  }

  reset(){
    console.log("Got to reset")
    this.resetbuttons()
    this.getData(this.startId)
    this.result = null;
  }

  analyzeOptions(){
    this.CompChoice = "test"
    const options = [["rock", this.currentAction.rock], ["paper", this.currentAction.paper], ["scissors", this.currentAction.scissors]]
    let currentRatio = 0;
    for(let option of options){
      if(option[1]){
        let ratio = option[1].wins/(option[1].wins + option[1].losses + option[1].ties)
        if(ratio >= currentRatio){
          currentRatio = option[1].wins/(option[1].wins + option[1].losses + option[1].ties);
          this.CompChoice = option[0]
        }
      }
    }
    const RockSum = this.currentAction.rock.wins + this.currentAction.rock.losses + this.currentAction.rock.ties
    const PaperSum = this.currentAction.paper.wins + this.currentAction.paper.losses + this.currentAction.paper.ties
    const ScissorsSum = this.currentAction.scissors.wins + this.currentAction.scissors.losses + this.currentAction.scissors.ties


    console.log("Are we random? ", (RockSum == 0 || PaperSum ==0 || ScissorsSum == 0))
    if((RockSum == 0 || PaperSum ==0 || ScissorsSum == 0)){
      console.log("Airps is picking randomly")
      const randomIndex = Math.floor(Math.random()*3);
      this.CompChoice = options[randomIndex][0]
      console.log("index", randomIndex)
    }

    console.log("Airps will throw " + this.CompChoice)
  }

  return(){
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
