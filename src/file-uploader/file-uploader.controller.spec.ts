import { INestApplication } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

describe('FileUploaderController', () => {
  let app: INestApplication;

  const mockFileUploaderService = {
    saveFile: jest.fn().mockResolvedValue('some-file-id'),
  };

  const mockFileInterceptor = jest
    .fn()
    .mockImplementation(() => (target, propertyKey, descriptor) => descriptor);

  afterEach(async () => {
    await app.close();

    jest.resetAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploaderController],
      providers: [
        {
          provide: FileUploaderService,
          useValue: mockFileUploaderService,
        },
        {
          provide: FileInterceptor,
          useValue: mockFileInterceptor,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should returns 201 and file details for valid file upload', async () => {
    const validFile = {
      fieldname: 'fileName',
      originalname: 'test.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      buffer: Buffer.from('some text'),
      size: 9,
    };

    const response = await request(app.getHttpServer())
      .post('/upload')
      .attach(
        validFile.fieldname,
        Buffer.from(validFile.buffer),
        validFile.originalname,
      );

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      fileId: 'some-file-id',
      originalFileName: validFile.originalname,
      fileType: validFile.mimetype,
    });
    expect(mockFileUploaderService.saveFile).toHaveBeenCalledWith(validFile);
  });

  it('should returns 400 for invalid file size', async () => {
    const largeFile = {
      fieldname: 'fileName',
      originalname: 'large.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: Buffer.alloc(1024 * 1024 * 2), // 2MB
    };

    const response = await request(app.getHttpServer())
      .post('/upload')
      .attach('fileName', largeFile.buffer, largeFile.originalname);

    expect(response.status).toBe(400);
    expect(mockFileUploaderService.saveFile).not.toHaveBeenCalled();
  });

  it('should returns 400 for invalid file type', async () => {
    const invalidFile = {
      fieldname: 'fileName',
      originalname: 'test.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      buffer: Buffer.from('some-text-data'),
    };

    const response = await request(app.getHttpServer())
      .post('/upload')
      .attach('fileName', invalidFile.buffer, invalidFile.originalname);

    expect(response.status).toBe(400);
    expect(mockFileUploaderService.saveFile).not.toHaveBeenCalled();
  });
});
