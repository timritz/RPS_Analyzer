import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  currentAction: any;
  bestOption: any;
  turnBeginning: any;
  pickedAction: any;
  outcome: any;
  intialOptionId: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.intialOptionId = "5bab9fe1631c7a4950085d9f"

  }

  ngOnInit() {
    this.getData(this.intialOptionId)
    this.turnBeginning = true;
  }

  getData(id: any){
    const tempObservable = this._httpService.getSingleAction(id)
    tempObservable.subscribe(data=>{
      console.log("data", data)
      this.currentAction = data[0]
      this.bestOption = null;
    })
  }

  getNext(option: any, result: any){
    console.log(result, " with ", option)
    this.turnBeginning = false;

    console.log("inside option", this.currentAction[option])
    console.log("inside result", this.currentAction[option][result])

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

  pickedRock(){
    this.turnBeginning = false;
    this.pickedAction = "rock"
  }
  pickedPaper(){
    this.turnBeginning = false;
    this.pickedAction = "paper"
  }
  pickedScissors(){
    this.turnBeginning = false;
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

  reset(){
    console.log("Got to reset")
    this.getData(this.intialOptionId)
  }

  return(){
    console.log("swiped left")
    this._router.navigate(['/'])
  }
}
