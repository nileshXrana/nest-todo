import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Label } from '../labels/entities/label.entity';

export default class LabelSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const repository = dataSource.getRepository(Label);
        const defaultLabels = ['high', 'medium', 'low', 'urgent', 'critical', 'important', 'normal'];

        for (const labelName of defaultLabels) {
            const exists = await repository.findOneBy({ label: labelName });
            if (!exists) {
                await repository.insert({ label: labelName });

            }
        }
    }
}
