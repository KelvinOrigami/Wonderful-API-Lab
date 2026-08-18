export type ObjectPayload = {
  name: string;
  data: {
    year: number;
    price: number;
    'CPU model': string;
    'Hard disk size': string;
  };
};

export type RestfulObject = ObjectPayload & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export function buildObjectPayload(
  name = uniqueObjectName(),
  price = 990,
  year = 2026,
): ObjectPayload {
  return {
    name,
    data: {
      year,
      price,
      'CPU model': 'QA Silicon',
      'Hard disk size': '512 GB',
    },
  };
}

export function uniqueObjectName(): string {
  return `QA Lab Device ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
