import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginationResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members : Member[] = [];


  constructor(private http: HttpClient) { }

  getMembers(userParams : UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
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


  setMainPhoto(photoId : number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/'+ photoId, {});
  }


  deletePhoto(photoId : number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/'+ photoId);
  }


  //----------- private method -----------//

  private getPaginationHeaders(pageNumber : number, pageSize : number) {
    // HttParams() : utility or class provided by angular that allows us to set
    // query string parameters along with the HTTP request.
    let params = new HttpParams();
    
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
  }


  private getPaginatedResult<T>(url : string, params: HttpParams) {
    const paginatedResult : PaginationResult<T> = new PaginationResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

}
