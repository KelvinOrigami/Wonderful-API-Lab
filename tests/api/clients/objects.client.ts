import type {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';
import type { ObjectPayload } from '../data/object.data';

export class ObjectsClient {
  public constructor(private readonly request: APIRequestContext) {}

  public create(payload: ObjectPayload): Promise<APIResponse> {
    return this.request.post('/objects', {
      headers: { 'Content-Type': 'application/json' },
      data: payload,
    });
  }

  public getById(objectId: string): Promise<APIResponse> {
    return this.request.get(`/objects/${objectId}`);
  }

  public update(
    objectId: string,
    payload: ObjectPayload,
  ): Promise<APIResponse> {
    return this.request.put(`/objects/${objectId}`, {
      headers: { 'Content-Type': 'application/json' },
      data: payload,
    });
  }

  public delete(objectId: string): Promise<APIResponse> {
    return this.request.delete(`/objects/${objectId}`);
  }
}
