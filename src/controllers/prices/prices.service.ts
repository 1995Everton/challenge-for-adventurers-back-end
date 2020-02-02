import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'dotenv/config'
import { Price } from './price';

@Injectable()
export class PricesService {

  constructor(
    private http: HttpService
  ){}

  findAll(): Observable<AxiosResponse<Price[]>>{
    return this.http.get(`${process.env.BASE_API}/data/${process.env.SECRET_KEY}/prices`)
      .pipe( map(response => response.data))
  }
}
