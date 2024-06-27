import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdentityConfiguration } from './identity.configuration';
import { Observable } from 'rxjs';
import { TableQueryResult } from '../../shared/models/table.query-result';
import { UserCreateModel, UserRecord, UserRolesModel, UserUpdateModel } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private config: IdentityConfiguration) { }

  getUsers(filterText: string, sortColumns: string[] = [], sortDirections: string[]=[],
    page: number, pageSize: number) : Observable<TableQueryResult<UserRecord>> {
      return this.http.post<TableQueryResult<UserRecord>>(this.config.apiEndpoint + '/api/user/query', {
        query: filterText,
        page: page,
        pageSize: pageSize,
        sorts: sortColumns.map((col, i) => {
          return {
            property: col,
            direction: sortDirections[i]
          }
        })
      });
  }

  getUser(id: string) : Observable<UserRecord> {
    return this.http.get<UserRecord>(this.config.apiEndpoint + '/api/user/' + id);
  }

  createUser(user: UserCreateModel) : Observable<UserRecord> {
    return this.http.post<UserRecord>(this.config.apiEndpoint + '/api/user', user);
  }

  updateUser(id: string, user: UserUpdateModel) : Observable<UserRecord> {
    return this.http.put<UserRecord>(this.config.apiEndpoint + '/api/user/' + id, user);
  }

  deleteUser(id: string) : Observable<any> {
    return this.http.delete(this.config.apiEndpoint + '/api/user/' + id);
  }

  setRoles(id: string, roles: string[]) : Observable<any> {
    return this.http.put(this.config.apiEndpoint + '/api/user/' + id + '/roles', roles);
  }
}
