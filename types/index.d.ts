interface ApiErrorResponse {
  data?: unknown;
  errors?: {
    [field: string]: string;
  };
}

interface Report {
  type: "LOST" | "FOUND";
  itemName: string;
  description: string;
  category:
    | "ELECTRONICS"
    | "BAG"
    | "CLOTHING"
    | "ACCESSORY"
    | "DOCUMENT"
    | "OTHER";
  color: string;
  location: string;
  reportedAt: string;
}

interface Reports {
  id: string;
  type: "LOST" | "FOUND";
  itemName: string;
  description: string;
  category: string;
  color: string;
  location: string;
  reportedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ReportsResponse {
  data: Reports[];
  pagination?: {
    total: number;
    limit: number;
    offset: number;
  };
}
