import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { FindVideosDto } from '../dto/findall-videos.dto';
import { HttpStatus } from '@nestjs/common';
import { ResponseVideoDto } from '../dto/response-video.dto';
import { RequestVideoDto } from '../dto/request-video.dto';

const result: { rows: ResponseVideoDto[]; count: number } = {
  rows: [],
  count: 0,
};

const newVideo: RequestVideoDto | ResponseVideoDto = {
  videoId: 'video101112',
  title: 'New Video',
  description: 'This is a new video',
  img: 'http://example.com/img4.jpg',
  duration: '40:00',
};

// Crear mocks
const mockAppService = {
  findAll: jest.fn().mockResolvedValue(result),
  submitVideo: jest.fn().mockResolvedValue(newVideo),
  deleteVideo: jest.fn().mockResolvedValue('Video eliminado exitosamente'),
};

describe('AppController', () => {
  let appController: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('findAll', () => {
    it('debería devolver una serie de vídeos', async () => {
      const { rows, count } = await service.findAll();
      const videos = new FindVideosDto();
      videos.total = count;
      videos.data = rows;

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await appController.findAll(response);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith(videos);
    });
  });

  describe('submitVideo', () => {
    it('deberia enviar un video', async () => {
      const video = await service.submitVideo(newVideo);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await appController.submitVideo(newVideo, response);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith(video);
    });
  });

  describe('deleteVideo', () => {
    it('deberia borrar un video', async () => {
      const videoId: string = 'some-video-id';
      const result = await service.deleteVideo(videoId);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await appController.deleteVideo(videoId, response);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({ result: result });
    });
  });
});
