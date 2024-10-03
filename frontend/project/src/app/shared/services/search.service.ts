import {inject, Injectable} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  // Example of a simple method that returns a greeting message
  public getProperties(): Observable<any> {
    return this.http.get<Observable<any>>('http://localhost:8080/api/properties');
  }

  public getFavorites():Observable<any> {
    return this.http.get<Observable<any>>('http://localhost:8080/api/cities/favorites');
  }
}

