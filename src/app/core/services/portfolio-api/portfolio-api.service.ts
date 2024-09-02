import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PortfolioApiService {
  constructor(private httpClient: HttpClient) {}

  getServicePage(fileName: string ): Observable<any[]> {
    return this.httpClient.get<any[]>(`/assets/data/${fileName}.json`);
  }
}
