// Requires browser, might consider adding node-fetch as dep
const headers = new Headers()
headers.append("Accept", "application/json, text/plain, */*")
headers.append("Content-Type", "application/json")

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
