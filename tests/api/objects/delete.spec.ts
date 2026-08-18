import { test, expect } from '../fixtures/api.fixture';

test.describe('Objects API | Delete', { tag: ['@api', '@regression'] }, () => {
  test('deletes the object and returns 404 afterward', async ({
    objectsClient,
    createdObject,
  }) => {
    const response = await objectsClient.delete(createdObject.body.id);

    expect(response.status()).toBe(200);

    const body = await response.json();
    const expectedMessage =
      `Object with id = ${createdObject.body.id} has been deleted.`;

    expect(body.message).toBe(expectedMessage);

    const verifyResponse = await objectsClient.getById(createdObject.body.id);

    expect(verifyResponse.status()).toBe(404);
  });
});
