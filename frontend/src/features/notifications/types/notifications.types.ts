export interface Notification {
  _id: string;
  userId: string;
  type: 'SETTINGS' | 'NOTIFICATION' | 'ERROR' | 'ANNOUNCMENT';
  data: {
    title: string;
    message?: string;
    linkUrl?: string;
    linkLabel?: string;
  };
  readAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  createdAtDiff?: string;
  id: string;
}

export interface NotificationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number;
  PrevPage?: number;
}

