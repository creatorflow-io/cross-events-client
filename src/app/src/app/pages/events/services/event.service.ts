import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TcpEvent } from '../shared/event.model';
import { EventServiceConfiguration } from './service.configuration';
import { Observable } from 'rxjs';
import { TableQueryResult } from '../../shared/models/table.query-result';
import { OperationResult } from '../../shared/models/operation-result';

@Injectable({
    providedIn: 'root'
  })
  export class EventService {
    constructor(private http: HttpClient, private config: EventServiceConfiguration) {

    }

    getEvents(filterText: string, status: string, sortColumns: string[] = [], sortDirections: string[]=[], 
         page: number, pageSize: number) : Observable<TableQueryResult<TcpEvent>> {

        return this.http.post<TableQueryResult<TcpEvent>>(this.config.apiEndpoint + '/api/events/query', {
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

    processEvent(id: string) {
        return this.http.post<OperationResult>(this.config.apiEndpoint + `/api/events/${id}/process`, null);
    }

    abandonEvent(id: string) {
        return this.http.post<OperationResult>(this.config.apiEndpoint + `/api/events/${id}/abandon`, null);
    }
  }