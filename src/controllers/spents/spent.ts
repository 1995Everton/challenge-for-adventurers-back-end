import { ApiProperty } from '@nestjs/swagger';

export class Spent {

  @ApiProperty({
    type: String,
    example: "02/02/2020"
  })
  date: string

  @ApiProperty({
    type: Number,
    example: 30.25
  })
  value: number

}