import { test as base, expect } from '@playwright/test';
import { ObjectsClient } from '../clients/objects.client';
import {
  buildObjectPayload,
  type ObjectPayload,
  type RestfulObject,
} from '../data/object.data';

type CreatedObject = {
  body: RestfulObject;
  payload: ObjectPayload;
};

type ApiFixtures = {
  objectsClient: ObjectsClient;
  createdObject: CreatedObject;
};

export const test = base.extend<ApiFixtures>({
  objectsClient: async ({ request }, use) => {
    await use(new ObjectsClient(request));
  },

  createdObject: async ({ objectsClient }, use) => {
    const payload = buildObjectPayload();
    const response = await objectsClient.create(payload);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as RestfulObject;
    expect(body.id).toBeTruthy();

    await use({ body, payload });

    const cleanupResponse = await objectsClient.delete(body.id);
    expect([200, 404]).toContain(cleanupResponse.status());
  },
});

export { expect };
