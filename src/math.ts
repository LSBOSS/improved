export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(min, val), max)
}

export function lerp(from: number, to: number, t: number) {
  return from + clamp(t, 0, 1) * (to - from)
}
