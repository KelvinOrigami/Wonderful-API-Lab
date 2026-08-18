import { test, expect } from '../fixtures/api.fixture';
import {
  buildObjectPayload,
  type RestfulObject,
} from '../data/object.data';

test.describe('Objects API | Create', { tag: ['@api', '@regression'] }, () => {
  test('creates an object with the expected data', async ({ objectsClient }) => {
    const payload = buildObjectPayload();
    let objectId: string | undefined;

    try {
      const response = await objectsClient.create(payload);

      expect(response.status()).toBe(200);

      const body = (await response.json()) as RestfulObject;
      objectId = body.id;

      expect(body.id).toBeTruthy();
      expect(body.name).toBe(payload.name);
      expect(body.data.year).toBe(payload.data.year);
      expect(Number(body.data.price)).toBe(payload.data.price);
    } finally {
      if (objectId) {
        const cleanupResponse = await objectsClient.delete(objectId);
        expect([200, 404]).toContain(cleanupResponse.status());
      }
    }
  });
});
