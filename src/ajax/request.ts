import "isomorphic-fetch"

const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json"
}

export default async function request(
  method: "get" | "post" | "put" | "delete",
  url: string,
  body?: {}
) {
  const init = {
    method,
    headers,
    body: body ? JSON.stringify(body) : ""
  }
  return (await fetch(url, init)).json()
}
