const {
  createStatusTransport,
  getStatusTransportById,
  updateStatusTransport,
  deleteStatusTransport,
} = require('../modules/statusTransport');

describe('statusTransport module tests', () => {
  let testStatusId;
  let testUserId;

  beforeAll(() => {
    testStatusId = 1;
    testUserId = 5;
  });

  test('createStatusTransport - should create a new status transport', async () => {
    const result = await createStatusTransport(testStatusId, testUserId);
    expect(result).toHaveProperty('status_id', testStatusId);
    expect(result).toHaveProperty('user_id', testUserId);
  });

  test('getStatusTransportById - should get a transport status by ID', async () => {
    const result = await getStatusTransportById(21);
    expect(result).toHaveProperty('status_id', 1);
    expect(result).toHaveProperty('user_id', 5);
  });

  test('updateStatusTransport - should update a status transport', async () => {
    const newStatusId = 2;
    const newUser = 6;
    const result = await updateStatusTransport(22, newStatusId, newUser, new Date());
    expect(result).toHaveProperty('status_id', newStatusId);
    expect(result).toHaveProperty('user_id', newUser);
  });

  test('getStatusTransportById - should throw an error for non-existent ID', async () => {
    await expect(getStatusTransportById(9999)).rejects.toThrow('Status transport not found');
  });

  test('updateStatusTransport - should fail with invalid data', async () => {
    try {
      await updateStatusTransport(22, null, null, new Date());
    } catch (error) {
      expect(error.message).toMatch(/Invalid data/);
    }
  });


  test('createStatusTransport - should fail with invalid data', async () => {
    try {
      await createStatusTransport(null, null);
    } catch (error) {
      expect(error.message).toMatch(/Invalid data/);
    }
  });

  // test('deleteStatusTransport - should delete a status transport', async () => {
  //   const result = await deleteStatusTransport(24); // Using an existing transport_status_id
  //   expect(result).toEqual({ message: 'Record deleted successfully' });
  // });
});
