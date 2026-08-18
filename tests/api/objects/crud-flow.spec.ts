import { test, expect } from '../fixtures/api.fixture';
import {
  buildObjectPayload,
  type RestfulObject,
} from '../data/object.data';

test.describe(
  'Objects API | CRUD smoke flow',
  { tag: ['@api', '@smoke'] },
  () => {
    test('runs Create, Read, Update and Delete in order', async ({
      objectsClient,
    }) => {
      const createPayload = buildObjectPayload();
      let objectId: string | undefined;

      try {
        const createResponse = await objectsClient.create(createPayload);
        expect(createResponse.status()).toBe(200);

        const createdObject =
          (await createResponse.json()) as RestfulObject;
        objectId = createdObject.id;

        expect(objectId).toBeTruthy();
        expect(createdObject.name).toBe(createPayload.name);
        expect(Number(createdObject.data.price)).toBe(createPayload.data.price);

        const readResponse = await objectsClient.getById(objectId);
        expect(readResponse.status()).toBe(200);

        const readObject = (await readResponse.json()) as RestfulObject;
        expect(readObject.id).toBe(objectId);
        expect(readObject.name).toBe(createPayload.name);

        const updatePayload = buildObjectPayload(
          `${createPayload.name} - Updated`,
          1299.5,
          2026,
        );
        const updateResponse = await objectsClient.update(
          objectId,
          updatePayload,
        );
        expect(updateResponse.status()).toBe(200);

        const updatedObject =
          (await updateResponse.json()) as RestfulObject;
        expect(updatedObject.name).toBe(updatePayload.name);
        expect(Number(updatedObject.data.price)).toBe(1299.5);

        const deleteResponse = await objectsClient.delete(objectId);
        expect(deleteResponse.status()).toBe(200);

        const deleteResult = await deleteResponse.json();
        expect(deleteResult.message).toBe(
          `Object with id = ${objectId} has been deleted.`,
        );

        const verifyResponse = await objectsClient.getById(objectId);
        expect(verifyResponse.status()).toBe(404);
      } finally {
        if (objectId) {
          const cleanupResponse = await objectsClient.delete(objectId);
          expect([200, 404]).toContain(cleanupResponse.status());
        }
      }
    });
  },
);
