import { ApiProperty } from "@nestjs/swagger"

export class Check {

  @ApiProperty({
    type: Number,
    example: 98.899745979
  })
  hit: number

  @ApiProperty({
    type: Array,
    example: [
      98.199745979,
      45.999745979,
      78.499745979,
      41.699745979
    ]
  })
  history: Array<number>
}