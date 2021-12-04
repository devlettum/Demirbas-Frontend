import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Insan } from '../models/insan';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  apiUrl: string = 'https://localhost:44342/api/';
  constructor(private httpClient: HttpClient) { }

  getPeople()  {
    let newPath : string = this.apiUrl + 'insans';
    return this.httpClient.get<Insan[]>(newPath);
  }

  deletePeople(id:number) {
    let newPath : string = this.apiUrl + 'insans/' + id;
    return this.httpClient.delete(newPath);
  }
}
