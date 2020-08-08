import { Injectable } from '@nestjs/common';
import { RequestDto } from './dto/request.dto';
import { ProjectRepoService } from 'src/model/project/project-repo/project-repo.service';

@Injectable()
export class RequestService {
  constructor(private readonly projectRepo: ProjectRepoService) {}

  async capture(dto: RequestDto): Promise<void> {
    return this.projectRepo.captureRequest(dto);
  }
}
