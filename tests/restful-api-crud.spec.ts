import { test, expect } from '@playwright/test';

test.describe('Restful API CRUD flow', () => {
  test('Create, Read, Update and Delete an object', async ({ request }) => {
    const objectName = `QA Lab Device ${Date.now()}`;
    const objectPrice = 990;
    const objectYear =
      Math.floor(Math.random() * (2026 - 2015 + 1)) + 2015;

    const createResponse = await request.post('/objects', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: objectName,
        data: {
          year: objectYear,
          price: objectPrice,
          'CPU model': 'QA Silicon',
          'Hard disk size': '512 GB',
        },
      },
    });

    expect(createResponse.status()).toBe(200);

    const createdObject = await createResponse.json();

    expect(createdObject.id).toBeTruthy();
    expect(typeof createdObject.id).toBe('string');
    expect(createdObject.name).toBe(objectName);
    expect(createdObject.data.year).toBeGreaterThanOrEqual(2015);
    expect(createdObject.data.year).toBeLessThanOrEqual(2026);
    expect(Number(createdObject.data.price)).toBe(objectPrice);

    const objectId = createdObject.id;

    const readResponse = await request.get(`/objects/${objectId}`);

    expect(readResponse.status()).toBe(200);

    const readObject = await readResponse.json();

    expect(readObject.id).toBe(objectId);
    expect(readObject.name).toBe(objectName);

    const updatedObjectName = `${objectName} - Updated`;
    const updatedObjectPrice = 1299.5;

    const updateResponse = await request.put(`/objects/${objectId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: updatedObjectName,
        data: {
          year: 2026,
          price: updatedObjectPrice,
          'CPU model': 'QA Silicon',
          'Hard disk size': '512 GB',
        },
      },
    });

    expect(updateResponse.status()).toBe(200);

    const updatedObject = await updateResponse.json();

    expect(updatedObject.name).toBe(updatedObjectName);
    expect(updatedObject.name).toContain('Updated');
    expect(Number(updatedObject.data.price)).toBe(updatedObjectPrice);

    const deleteResponse = await request.delete(`/objects/${objectId}`);

    expect(deleteResponse.status()).toBe(200);

    const deleteResult = await deleteResponse.json();
    const expectedDeleteMessage =
      `Object with id = ${objectId} has been deleted.`;

    expect(deleteResult.message).toBeTruthy();
    expect(deleteResult.message).toBe(expectedDeleteMessage);

    const verifyDeletedResponse = await request.get(`/objects/${objectId}`);

    expect(verifyDeletedResponse.status()).toBe(404);
  });
});