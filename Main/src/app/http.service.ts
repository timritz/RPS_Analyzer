import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {}

  getSingleAction(id: any){
    return this._http.get("/api/actions/" + id)
  }

  newAction(){
    return this._http.post("/api/actions", {})
  }

  updateAction(id: any, obj: Object){
    return this._http.put("/api/actions/"+id, obj)
  }

  deleteProduct(id: any){
    return this._http.delete("/api/products/"+id)
  }
}
