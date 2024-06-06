import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { localization, translateDetails, userDetails } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * Variable used to hit the endpoint to make the fake api call.
   */
  staticEndPoint: string = 'https://jsonplaceholder.typicode.com/posts';
  /**
   * Used to store the particular language heading details
   */
  currentlocalizationDetails!: translateDetails;
  /**
   * State Management of Subject used to get the edit data for the user
   */
  editUserDetails: userDetails | null = {
    id: null,
    firstName: null,
    lastName: null,
    address: null,
    profileUrl: null,
    email: null
  };
  /**
   * State management for the userlist to store the user details locally.
   */
  userListDetails = new BehaviorSubject<userDetails[]>([]);
  /**
   * State management variable used to store the list of data.
   */
  userDetailsData: userDetails[] = []
  /**
   * Constructoe used to inject the dependency this component
   * @param http used to make the http call.
   */
  constructor(private http: HttpClient) { }

  /**
   * Method used to get the translate value from json in assets
   * @returns has return the observale of localization value
   */
  onTranslateValue(): Observable<localization> {
    return this.http.get<localization>('/assets/localization.json');
  }

  onSaveUserData(userData: userDetails): Observable<userDetails> {
    return this.http.post<userDetails>(this.staticEndPoint, userData);
  }

  onDeleteUserData(id: number | null): Observable<userDetails> {
    return this.http.delete<userDetails>(this.staticEndPoint + '/' + id);
  }

  onUpdateUserData(id: number | null, userDetails: userDetails): Observable<userDetails> {
    return this.http.put<userDetails>(this.staticEndPoint + '/' + 1, userDetails);
  }
}
