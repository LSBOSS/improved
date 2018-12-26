import { randomBytes } from "crypto"
export { randomBytes }

const BYTE_POWER_OF_BITS = 3

export function randomString(length: number = 32) {
  return randomBytes(length >> 1).toString("hex")
}

export function randomInt(length: number = 32) {
  return randomBytes(length).reduce(
    (a, v, i) => (a += v << (i * BYTE_POWER_OF_BITS)),
    0
  )
}
