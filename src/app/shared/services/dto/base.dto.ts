export default interface BaseDto
{
  success: boolean;
  request: string;
  method: string;
  code: number;
  error?: string
  data?: unknown;
}
