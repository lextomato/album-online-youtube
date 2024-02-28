import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entities/videos.entity';
import { Repository } from 'typeorm';
import { RequestVideoDto } from './dto/request-video.dto';
import { ResponseVideoDto } from './dto/response-video.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async findAll(): Promise<{ rows: ResponseVideoDto[]; count: number }> {
    const [results, count] = await this.videoRepository
      .findAndCount()
      .catch(() => {
        throw new HttpException(
          {
            status: 'error',
            message: `Error inesperado al consultar los videos`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    const rows = results.map((video) => new ResponseVideoDto(video));
    return { count: count, rows: rows };
  }

  async submitVideo(video: RequestVideoDto): Promise<ResponseVideoDto> {
    const existingVideo = await this.videoRepository.findOneBy({
      videoId: video.videoId,
    });
    if (existingVideo)
      throw new HttpException(
        {
          status: 'error',
          message: 'El video ya existe.',
          video: video,
        },
        HttpStatus.CONFLICT,
      );
    else return new ResponseVideoDto(await this.videoRepository.save(video));
  }

  async deleteVideo(videoId: string): Promise<string> {
    const { affected } = await this.videoRepository
      .delete(videoId)
      .catch(() => {
        throw new HttpException(
          {
            status: 'error',
            message: `Error inesperado al intentar borrar el video`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (affected <= 0)
      throw new HttpException(
        {
          status: 'error',
          message: 'Hubo problemas para eliminar el video.',
        },
        HttpStatus.CONFLICT,
      );
    return 'Video eliminado exitosamente';
  }
}
