export interface ApiResponse<T> {
  success: boolean;
  data: T;
  status: number;
  timestamp: string;
}
