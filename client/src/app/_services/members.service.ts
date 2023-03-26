import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  members : Member[] = [];


  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map((members : Member[]) => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username : string) {
    const member = this.members.find(x => x.userName === username);
    if (member) return of(member)
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member : Member) {
    return this.http.put<Member>(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    )
  }


  // addPhoto(photo : Photo) {
  //   return this.http.post<Photo>(this.baseUrl + 'users/add-photo', photo)
  // }


  //----------- private method -----------//

}
