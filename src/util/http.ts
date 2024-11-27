import { IPicGoResponse } from "../types/picgo";

export function handleResponse(
  statusCode: number,
  body?: IPicGoResponse,
  header?: { [key: string]: string },
): Response {
  statusCode = statusCode || 200;
  header = header || {
    'Content-Type': 'application/json',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-origin': '*'
  };
  body = body || { success: false };

  if (body && body.success === false) {
    // empty
  }
  return new Response(JSON.stringify(body), { status: statusCode, headers: header });
}