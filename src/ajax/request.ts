import "isomorphic-fetch"
import { IStringIndexed } from "../types"

const defaultHeaders = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json"
}

export default async function request(
  method: "get" | "post" | "put" | "delete",
  url: string,
  body?: {},
  customHeaders: IStringIndexed = {}
) {
  const init = {
    method,
    headers: {
      ...defaultHeaders,
      ...customHeaders
    },
    body: body ? JSON.stringify(body) : ""
  }
  return (await fetch(url, init)).json()
}
