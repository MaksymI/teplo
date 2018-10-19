import { RecordsTableModule } from './records-table.module';

describe('RecordsTableModule', () => {
  let recordsTableModule: RecordsTableModule;

  beforeEach(() => {
    recordsTableModule = new RecordsTableModule();
  });

  it('should create an instance', () => {
    expect(recordsTableModule).toBeTruthy();
  });
});
