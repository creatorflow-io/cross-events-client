import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TcpClient } from '../shared/client.model';
import { ClientServiceConfiguration } from './service.configuration';
import { Observable } from 'rxjs';
import { TableQueryResult } from '../../shared/models/table.query-result';
import { OperationResult } from '../../shared/models/operation-result';

@Injectable({
    providedIn: 'root'
  })
  export class ClientSevice {
    constructor(private http: HttpClient, private config: ClientServiceConfiguration) {

    }

    getClients(filterText: string, status: string, sortColumns: string[] = [], sortDirections: string[]=[], 
         page: number, pageSize: number) : Observable<TableQueryResult<TcpClient>> {

        return this.http.post<TableQueryResult<TcpClient>>(this.config.apiEndpoint + '/api/clients/query', {
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
        return this.http.post<OperationResult>(this.config.apiEndpoint + `/api/clients/${id}/accept`, null);
    }

    banClient(id: string) {
        return this.http.post<OperationResult>(this.config.apiEndpoint + `/api/clients/${id}/ban`, null);
    }
  }