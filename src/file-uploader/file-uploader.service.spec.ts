import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs/promises';
import { join } from 'path';
import { FileUploaderService } from './file-uploader.service';

jest.mock('fs/promises');

describe('FileUploaderService', () => {
  let service: FileUploaderService;

  const mockDateNow = jest.spyOn(Date, 'now');
  const mockMathRound = jest.spyOn(Math, 'round');
  const mockMkdir = fs.mkdir as jest.Mock;
  const mockWriteFile = fs.writeFile as jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploaderService],
    }).compile();

    mockDateNow.mockReturnValue(1);
    mockMathRound.mockReturnValue(1);
    mockMkdir.mockResolvedValue(undefined);
    mockWriteFile.mockResolvedValue(undefined);

    service = module.get<FileUploaderService>(FileUploaderService);
  });

  afterAll(async () => {
    mockDateNow.mockRestore();
    mockMathRound.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save file successfully and return metadata', async () => {
    const file: Express.Multer.File = {
      originalname: 'test.txt',
      buffer: Buffer.from('test content'),
      mimetype: 'text/plain',
    } as any;

    const result = await service.saveFile(file);

    expect(result).toBe('11');
    expect(mockMkdir).toHaveBeenCalledWith(join(process.cwd(), 'upload'), {
      recursive: true,
    });
    expect(mockWriteFile).toHaveBeenCalledWith(expect.any(String), file.buffer);
  });

  it('should throw BadRequestException if directory creation fails', async () => {
    const file: Express.Multer.File = {
      originalname: 'test.txt',
      buffer: Buffer.from('test content'),
      mimetype: 'text/plain',
    } as any;

    const mockMkdir = fs.mkdir as jest.Mock;
    mockMkdir.mockRejectedValue(new Error('Failed to create directory'));

    await expect(service.saveFile(file)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if file write fails', async () => {
    const file: Express.Multer.File = {
      originalname: 'test.txt',
      buffer: Buffer.from('test content'),
      mimetype: 'text/plain',
    } as any;

    const mockMkdir = fs.mkdir as jest.Mock;
    const mockWriteFile = fs.writeFile as jest.Mock;

    mockMkdir.mockResolvedValue(undefined);
    mockWriteFile.mockRejectedValue(new Error('Failed to write file'));

    await expect(service.saveFile(file)).rejects.toThrow(BadRequestException);
  });
});
