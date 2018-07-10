import { get } from "../ajax"

export default async function() {
  const res = await get("https://httpbin.org/get")
  console.log(res)
}
