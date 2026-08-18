import { test, expect } from '../fixtures/api.fixture';
import { buildObjectPayload, type RestfulObject } from '../data/object.data';

test.describe('Objects API | Update', { tag: ['@api', '@regression'] }, () => {
  test('updates the object name and price', async ({
    objectsClient,
    createdObject,
  }) => {
    const updatedName = `${createdObject.payload.name} - Updated`;
    const updatedPrice = 1299.5;
    const updatePayload = buildObjectPayload(
      updatedName,
      updatedPrice,
      2026,
    );

    const response = await objectsClient.update(
      createdObject.body.id,
      updatePayload,
    );

    expect(response.status()).toBe(200);

    const body = (await response.json()) as RestfulObject;

    expect(body.name).toBe(updatedName);
    expect(body.name).toContain('Updated');
    expect(Number(body.data.price)).toBe(updatedPrice);
  });
});
