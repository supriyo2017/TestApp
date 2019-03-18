import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/_models/user";

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: "Bearer " + localStorage.getItem("token")
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseIrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    //return this.http.get<User[]>(this.baseIrl + "users", httpOptions);
    return this.http.get<User[]>(this.baseIrl + 'users');
  }

  getUser(id): Observable<User> {
    //return this.http.get<User>(this.baseIrl + "users/" + id, httpOptions);
    return this.http.get<User>(this.baseIrl + 'users/' + id);
  }

  updateUser(id: number, user: User){
    return this.http.put(this.baseIrl + 'users/'+id, user);
  }
}
