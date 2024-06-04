import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { localization, translateDetails } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * Used to store the particular language heading details
   */
  currentlocalizationDetails!: translateDetails;

  constructor(private http: HttpClient) { }

  /**
   * Method used to get the translate value from json in assets
   * @returns has return the observale of localization value
   */
  onTranslateValue(): Observable<localization> {
    return this.http.get<localization>('/assets/localization.json');
  }
}
