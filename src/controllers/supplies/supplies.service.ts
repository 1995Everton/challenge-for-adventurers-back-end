import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'dotenv/config'
import { Supplie } from './supplie';

@Injectable()
export class SuppliesService {
  constructor(
    private http: HttpService
  ){}

  findAll(): Observable<AxiosResponse<Supplie[]>>{
    return this.http.get(`${process.env.BASE_API}/data/${process.env.SECRET_KEY}/supplies`)
      .pipe( map(response => response.data))
  }
}
