import { test, expect } from '../fixtures/api.fixture';
import type { RestfulObject } from '../data/object.data';

test.describe('Objects API | Read', { tag: ['@api', '@regression'] }, () => {
  test('reads the object created for the test', async ({
    objectsClient,
    createdObject,
  }) => {
    const response = await objectsClient.getById(createdObject.body.id);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as RestfulObject;

    expect(body.id).toBe(createdObject.body.id);
    expect(body.name).toBe(createdObject.payload.name);
  });
});
