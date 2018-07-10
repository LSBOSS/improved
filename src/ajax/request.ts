import "isomorphic-fetch"
import { IStringIndexed } from "../types"
import { stringify } from "query-string"

const defaultHeaders = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json"
}

const formHeaders = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}

export default async function request(
  method: "get" | "post" | "put" | "delete",
  url: string,
  returnRawResponse: boolean,
  body?: {},
  form = false,
  customHeaders: IStringIndexed = {}
) {
  const init = {
    method,
    headers: {
      ...defaultHeaders,
      ...(form ? formHeaders : {}),
      ...customHeaders
    },
    body: body ? (form ? stringify(body) : JSON.stringify(body)) : undefined
  }

  const response = await fetch(url, init)
  return returnRawResponse ? response : response.json()
}
