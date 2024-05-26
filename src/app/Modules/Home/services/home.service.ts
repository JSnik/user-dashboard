import {HttpClient} from "@angular/common/http";
import {Environment} from "../../../../../environment/environment";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../models/users.model";

@Injectable()

export class HomeService {
  private baseUrl: string = Environment
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<User[]>(url)
  }

  getSpecificUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<User>(url);
  }

  editUser(id: number, data: any): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.put(url, data)
  }
}
