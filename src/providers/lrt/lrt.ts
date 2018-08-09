import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class LrtProvider {
  private resource_url = 'api/prasarana_rail.ashx?action=';

  constructor(public http: Http) { }

  getLrtStations(searchParamString): Observable<any> {
    return this.http.get(this.resource_url + searchParamString);
  }
}
