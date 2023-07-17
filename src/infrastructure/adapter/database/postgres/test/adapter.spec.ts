import { PostgresAdapter } from "../adapter";

// Mocking 'pg' module
jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('PostgresAdapter', () => {
  let postgresAdapter: PostgresAdapter;
  let mockClient: any;

  beforeEach(() => {
    postgresAdapter = new PostgresAdapter();
    mockClient = (postgresAdapter as any).client;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to database on creation', () => {
    expect(mockClient.connect).toHaveBeenCalledTimes(1);
  });

  it('should setup schema and location on setConfig', () => {
    postgresAdapter.setConfig('public', 'user');
    expect((postgresAdapter as any).table).toEqual('"public"."user"');
  });

  // Testing `create` method
  it('should call the right query on create', async () => {
    mockClient.query.mockResolvedValueOnce({ rows: [{ id: '1', name: 'John Doe' }] });

    const user = { name: 'John Doe' };
    await postgresAdapter.create(user);

    expect(mockClient.query).toBeCalledWith(
      expect.stringContaining('INSERT INTO'),
      expect.any(Array),
    );
  });

  // Continue to write other tests for `findAll`, `findOne`, `update`, and `delete` in the same way
});
