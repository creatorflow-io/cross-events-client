import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdentityConfiguration } from '../../users/services/identity.configuration';
import { Observable } from 'rxjs';
import { TableQueryResult } from '../../shared/models/table.query-result';
import { Role, RoleUpdate } from '../shared/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private config: IdentityConfiguration) { }

  getRoles(filterText: string, sortColumns: string[] = [], sortDirections: string[]=[], 
    page: number, pageSize: number) : Observable<TableQueryResult<Role>> {
      return this.http.post<TableQueryResult<Role>>(this.config.apiEndpoint + '/api/role/query', {
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

  getRole(id: string) {
    return this.http.get<Role>(this.config.apiEndpoint + `/api/role/${id}`);
  }

  createRole(role: RoleUpdate) {
    return this.http.post<Role>(this.config.apiEndpoint + '/api/role', role);
  }

  updateRole(id: string, role: RoleUpdate) {
    return this.http.put<Role>(this.config.apiEndpoint + `/api/role/${id}`, role);
  }

  deleteRole(id: string) {
    return this.http.delete(this.config.apiEndpoint + `/api/role/${id}`);
  }
}
