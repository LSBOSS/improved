import "./node-fetch"
import { IStringIndexed } from "../types"
import { stringify } from "query-string"

export type HTTPMethod = "get" | "post" | "put" | "delete"

const defaultHeaders = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json"
}

const formHeaders = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}

const supportsBlob = typeof window !== "undefined"

export default async function request(
  method: HTTPMethod,
  url: string,
  body?: {} | Blob,
  form = false,
  customHeaders: IStringIndexed = {}
): Promise<Response> {
  const init = {
    method,
    headers: {
      ...defaultHeaders,
      ...(form ? formHeaders : {}),
      ...customHeaders
    },
    body: body
      ? form
        ? stringify(body)
        : supportsBlob && body instanceof Blob
        ? body
        : JSON.stringify(body)
      : undefined
  }

  return fetch(url, init)
}
