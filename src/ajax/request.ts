import "isomorphic-fetch"
import { IStringIndexed } from "../types"

const defaultHeaders = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json"
}

export default async function request(
  method: "get" | "post" | "put" | "delete",
  url: string,
  returnRawResponse: boolean,
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

  const response = await fetch(url, init)
  return returnRawResponse ? response : response.json()
}
