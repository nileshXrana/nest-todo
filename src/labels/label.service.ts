import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelService {
    constructor(
        @InjectRepository(Label)
        private readonly labelRepository: Repository<Label>,
    ) {}

    async getAllLabels(): Promise<Label[]> {
        return await this.labelRepository.find();
    }
}
