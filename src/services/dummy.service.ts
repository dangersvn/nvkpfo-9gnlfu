// src/services/dummy.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from './loading-service';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getData(): Observable<any> {
    this.loadingService.show(); 
    return this.http.get('https://cat-fact.herokuapp.com/facts/')
      .pipe(
        delay(3000), // Add a 3-second delay
        finalize(() => {
          this.loadingService.hide(); 
        })
      );
  }
}
