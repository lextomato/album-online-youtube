import { IsString, Length } from 'class-validator';

export class RequestVideoDto {
  @IsString()
  @Length(11, 11)
  videoId: string;

  @IsString()
  @Length(0, 200)
  title: string;

  @IsString()
  description: string;

  @IsString()
  @Length(0, 100)
  img: string;

  @IsString()
  @Length(0, 30)
  duration: string;
}
