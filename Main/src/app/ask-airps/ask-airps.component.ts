import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-ask-airps',
  templateUrl: './ask-airps.component.html',
  styleUrls: ['./ask-airps.component.css']
})
export class AskAirpsComponent implements OnInit {
  currentAction: any;
  bestOption: any;
  turnBeginning: any;
  pickedAction: any;
  outcome: any;
  intialOptionId: any;
  started: any;

  rockStyle: any;
  paperStyle: any;
  scissorsStyle: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.intialOptionId = "5bab9fe1631c7a4950085d9f"
    this.started = false;

  }

  ngOnInit() {
    this.getData(this.intialOptionId)
    this.turnBeginning = true;
    this.rockStyle = "transparent"
    this.paperStyle = "transparent"
    this.scissorsStyle = "transparent"
    this.bestOption = true;

    // console.log("should be listening")
    $(document).ready(function(){
      // console.log("Listening")

     

      $("#Title").click(function(){
        // console.log("clicked dropdown")
        $("#DropDownList").slideToggle()
      })
      

    })
  }

  

  start(){
    this.started = true;
  }

  getData(id: any){
    const tempObservable = this._httpService.getSingleAction(id)
    tempObservable.subscribe(data=>{
      console.log("data", data[0])
      this.currentAction = data[0]
      this.bestOption = null;
      this.rockStyle = "transparent"
      this.paperStyle = "transparent"
      this.scissorsStyle = "transparent"
      this.bestOption = true;
    })
  }

  getNext(option: any, result: any){
    // console.log(result, " with ", option)
    this.turnBeginning = false;

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

  pickedRock(){
    this.turnBeginning = false;
    this.bestOption = true;
    this.pickedAction = "rock"
  }
  pickedPaper(){
    this.turnBeginning = false;
    this.bestOption = true;
    this.pickedAction = "paper"
  }
  pickedScissors(){
    this.turnBeginning = false;
    this.bestOption = true;
    this.pickedAction = "scissors"
  }

  won(){
    this.currentAction[this.pickedAction].wins ++;
    this.getNext(this.pickedAction, "won")
    this.turnBeginning = true;
  }
  lost(){
    this.currentAction[this.pickedAction].losses ++;
    this.getNext(this.pickedAction, "lost")
    this.turnBeginning = true;
  }
  tied(){
    this.currentAction[this.pickedAction].ties ++;
    this.getNext(this.pickedAction, "tied")
    this.turnBeginning = true;
  }

  analyzeOptions(){
    
    const options = [["rock", this.currentAction.rock], ["paper", this.currentAction.paper], ["scissors", this.currentAction.scissors]]
    let currentRatio = 0;
    
    const RockSum = this.currentAction.rock.wins + this.currentAction.rock.losses + this.currentAction.rock.ties
    const PaperSum = this.currentAction.paper.wins + this.currentAction.paper.losses + this.currentAction.paper.ties
    const ScissorsSum = this.currentAction.scissors.wins + this.currentAction.scissors.losses + this.currentAction.scissors.ties
    // console.log("Are we random? ", (RockSum == 0 || PaperSum ==0 || ScissorsSum == 0))
    if(RockSum == 0 || PaperSum ==0 || ScissorsSum == 0){
      this.bestOption = false;
    }else {
      for(let option of options){
        if(option[1]){
          let ratio = option[1].wins/(option[1].wins + option[1].losses + option[1].ties)
          if(ratio >= currentRatio){
            currentRatio = option[1].wins/(option[1].wins + option[1].losses + option[1].ties);
            this.bestOption = option[0]

            this.updateStyle(this.bestOption)
          }
        }
      }
      
    }
  }


  updateStyle(type: any){
    if(type == 'rock'){
      this.rockStyle = "transparent"
      this.paperStyle = "inherit"
      this.scissorsStyle = "transparent"
    }
    if(type == 'paper'){
      this.rockStyle = "transparent"
      this.paperStyle = "yellow"
      this.scissorsStyle = "transparent"
    }
    if(type == 'scissors'){
      this.rockStyle = "transparent"
      this.paperStyle = "transparent"
      this.scissorsStyle = "yellow"
    }
  }

  reset(){
    // console.log("Got to reset")
    this.getData(this.intialOptionId)
    this.turnBeginning = true;
    this.pickedAction = null;
  }

  return(){
    // console.log("swiped left")
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

