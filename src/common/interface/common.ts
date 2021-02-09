import * as express from 'express';
export interface CustomHttpRequest extends express.Request {
  tenantId: string;
  id: string;
  username: string;
}
