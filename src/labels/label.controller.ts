import { Controller, Get } from '@nestjs/common';
import { LabelService } from './label.service';
import { Label } from './entities/label.entity';

@Controller('labels')
export class LabelController {
    constructor(private readonly labelService: LabelService) {}

    @Get()
    getAllLabels(): Promise<Label[]> {
        return this.labelService.getAllLabels();
    }
}
