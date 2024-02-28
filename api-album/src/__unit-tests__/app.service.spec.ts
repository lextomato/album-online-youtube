import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { VideoEntity } from '../entities/videos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { RequestVideoDto } from '../dto/request-video.dto';
import { ResponseVideoDto } from '../dto/response-video.dto';

// Mock data
const videoCount = 3;
const videoArray: VideoEntity[] = [
  {
    id: 1,
    videoId: 'video123',
    title: 'First Video',
    description: 'This is the first video',
    img: 'http://example.com/img1.jpg',
    duration: '10:00',
  },
  {
    id: 2,
    videoId: 'video456',
    title: 'Second Video',
    description: 'This is the second video',
    img: 'http://example.com/img2.jpg',
    duration: '20:00',
  },
  {
    id: 3,
    videoId: 'video789',
    title: 'Third Video',
    description: 'This is the third video',
    img: 'http://example.com/img3.jpg',
    duration: '30:00',
  },
];

const newVideo: RequestVideoDto = {
  videoId: 'video101112',
  title: 'New Video',
  description: 'This is a new video',
  img: 'http://example.com/img4.jpg',
  duration: '40:00',
};

// Crear mocks
const mockVideoRepository = {
  findAndCount: jest.fn().mockResolvedValue([videoArray, videoArray.length]),
  findOneBy: jest.fn().mockResolvedValue(null),
  save: jest.fn().mockResolvedValue(newVideo),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('AppService', () => {
  let service: AppService;
  let videoRepository: Repository<VideoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(VideoEntity),
          useValue: mockVideoRepository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    videoRepository = module.get<Repository<VideoEntity>>(
      getRepositoryToken(VideoEntity),
    );
  });

  it('debe ser definido', () => {
    expect(service).toBeDefined();
    expect(videoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('debería devolver una serie de vídeos', async () => {
      const { rows, count } = await service.findAll();
      expect(count).toBe(videoCount);
      expect(rows).toEqual(
        videoArray.map((video) => new ResponseVideoDto(video)),
      );
      expect(mockVideoRepository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('submitVideo', () => {
    it('debería enviar exitosamente un nuevo video', async () => {
      const result = await service.submitVideo(newVideo);
      expect(result).toEqual(new ResponseVideoDto(newVideo));
      expect(mockVideoRepository.save).toHaveBeenCalledWith(newVideo);
    });

    it('debería generar una excepción de conflicto si el video existe', async () => {
      mockVideoRepository.findOneBy.mockResolvedValue(newVideo);

      try {
        await service.submitVideo(newVideo);
      } catch (e) {
        expect(e.status).toBe(HttpStatus.CONFLICT);
      }
    });
  });

  describe('deleteVideo', () => {
    it('debería eliminar un vídeo con éxito', async () => {
      const result = await service.deleteVideo('some-video-id');
      expect(result).toBe('Video eliminado exitosamente');
      expect(mockVideoRepository.delete).toHaveBeenCalledWith('some-video-id');
    });

    it('debería generar una excepción de conflicto si no se eliminó ningún video', async () => {
      mockVideoRepository.delete.mockResolvedValue({ affected: 0 });

      try {
        await service.deleteVideo('some-video-id');
      } catch (e) {
        expect(e.status).toBe(HttpStatus.CONFLICT);
      }
    });
  });
});
