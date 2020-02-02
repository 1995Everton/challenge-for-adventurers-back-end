import { ApiProperty } from '@nestjs/swagger';

export class Price {

  @ApiProperty({
    type: String,
    example: "02/02/2020"
  })
  date: string

  @ApiProperty({
    type: Number,
    example: 3.25
  })
  value: number

}