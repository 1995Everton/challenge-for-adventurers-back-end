import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'dotenv/config'
import { Spent } from './spent';

@Injectable()
export class SpentsService {
  constructor(
    private http: HttpService
  ){}

  findAll(): Observable<AxiosResponse<Spent[]>>{
    return this.http.get(`${process.env.BASE_API}/data/${process.env.SECRET_KEY}/spents`)
      .pipe( map(response => response.data))
  }
}
