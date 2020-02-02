import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Price } from '../prices/price';
import { Spent } from '../spents/spent';
import { Supplie } from '../supplies/supplie';
import { Total } from './total';
import * as moment from 'moment';
import { Check } from './check';

@Injectable()
export class TotalService {

  private $moment = moment
  private prices: Price[]
  private spents: Spent[]
  private supplies: Supplie[]

  constructor(
    private http: HttpService
  ){}

  async confirm(): Promise<Check> {
    const payload =  await this.getTotal()
    const response = await this.http
      .post(`${process.env.BASE_API}/check?id=${process.env.SECRET_KEY}`,payload)
      .pipe( map(response => response.data))
      .toPromise()
    return response
  }

  async reload(){
    const response = await this.http
      .get(`${process.env.BASE_API}/start/${process.env.EMAIL}?reload=true`)
      .toPromise()
    if(response){
      return { success : 'data loaded successfully' }
    }
    return { error : 'unable to reload data' }
  }

  async getTotal(){
    this.prices = await this.http
      .get<Price[]>(`${process.env.BASE_API}/data/${process.env.SECRET_KEY}/prices`)
      .pipe( map(response => response.data))
      .toPromise()
    this.supplies = await this.http
      .get<Supplie[]>(`${process.env.BASE_API}/data/${process.env.SECRET_KEY}/supplies`)
      .pipe( map(response => response.data))
      .toPromise()
    this.spents = await this.http
      .get<Spent[]>(`${process.env.BASE_API}/data/${process.env.SECRET_KEY}/spents`)
      .pipe( map(response => response.data))
      .toPromise()
    return this.total()
  }

  private total(): Total[]{
    const dates = [
      this.$moment((this.prices[0].date).split("/").reverse().join('-')),
      this.$moment((this.prices[this.prices.length - 1].date).split("/").reverse().join('-')),
      this.$moment((this.spents[0].date).split("/").reverse().join('-')),
      this.$moment((this.spents[this.spents.length - 1].date).split("/").reverse().join('-')),
      this.$moment((this.supplies[0].date).split("/").reverse().join('-')),
      this.$moment((this.supplies[this.supplies.length - 1].date).split("/").reverse().join('-')),
    ]
    const max = this.$moment.max(dates)
    const min = this.$moment.min(dates)
    const total: Total[] = []
    let total_day = 0

    const getGasolinePrice = (date: any, prices:Price[] ): any => {
      while (true) {
        let search = date.format("DD/MM/YYYY")
        let exists = prices.find( item => item.date == search )
        if(exists) return exists
        date.subtract(1, 'days')
      }
    }

    while (min.isSameOrBefore(max)) {
      const date = min.format("DD/MM/YYYY")

      const price =  getGasolinePrice(this.$moment(min),this.prices)

      let supply = this.supplies.find( item => item.date == date) || 0 as any
      if(supply) supply = supply.value / price.value
      
      let spents = this.spents.find( item => item.date == date) || 0 as any
      if(spents) spents = spents.value / 12
      
      total_day =  parseFloat((total_day +  supply - spents).toFixed(2))

      total.push({
        date,
        value: total_day
      })

      min.add(1, 'day');

    }

    return total

  }
}
