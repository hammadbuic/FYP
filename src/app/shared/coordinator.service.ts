import { Injectable } from '@angular/core';
import { flatMap, first, shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Coordinator } from '../interfaces/coordinator';
@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  readonly BaseURL = 'http://localhost:51528/api'
  private getCoordinatorDataURL:string="/coordinator/GetCoordinator";
  public coordinatorSpec:Promise<Coordinator>;
  constructor(private http:HttpClient) {
    this.coordinatorSpec=this.getCoordinatorInformation();
  }
   //get coordinator information
   async getCoordinatorInformation(){
    return await this.http.get<Coordinator>(this.BaseURL+this.getCoordinatorDataURL).toPromise();
  }
}
