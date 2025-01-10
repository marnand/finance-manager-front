export class Result<T = any> {
  isSuccess: boolean = false;
  data: T | null = null;
  error: Error | null = null;
}

interface Error {
  message: string,
  statusCode: number
}