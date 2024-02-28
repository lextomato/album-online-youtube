import { ResponseVideoDto } from './response-video.dto';

export class FindVideosDto {
  total: number;
  data: Array<ResponseVideoDto>;
}
