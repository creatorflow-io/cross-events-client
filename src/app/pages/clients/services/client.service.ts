import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TcpClient } from '../shared/client.model';
import { Observable } from 'rxjs';
import { TableQueryResult } from '../../shared/models/table.query-result';
import { OperationResult } from '../../shared/models/operation-result';
import { EventServiceConfiguration } from '../../events/services/service.configuration';

@Injectable({
    providedIn: 'root'
  })
  export class ClientSevice {
    constructor(private http: HttpClient, private config: EventServiceConfiguration) {

    }

    getClients(filterText: string, status: string, sortColumns: string[] = [], sortDirections: string[]=[], 
         page: number, pageSize: number) : Observable<TableQueryResult<TcpClient>> {

        return this.http.post<TableQueryResult<TcpClient>>(this.config.apiEndpoint + '/api/client/query', {
            query: filterText,
            page: page,
            pageSize: pageSize,
            status: status,
            sorts: sortColumns.map((col, i) => {
                return {
                    property: col,
                    direction: sortDirections[i]
                }
            })
        });
    }

    acceptClient(id: string) {
        return this.http.post<OperationResult>(this.config.apiEndpoint + `/api/client/${id}/accept`, null);
    }

    banClient(id: string) {
        return this.http.post<OperationResult>(this.config.apiEndpoint + `/api/client/${id}/ban`, null);
    }
  }