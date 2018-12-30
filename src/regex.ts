export function all(re: RegExp, str: string) {
  if (!re.global) {
    throw new Error("Executing regex.all on regex without global flag")
  }

  let exec = re.exec(str)
  const arr: string[][] = []

  while (exec !== null) {
    const [, ...captures] = exec
    arr.push(captures)
    exec = re.exec(str)
  }

  return arr
}

export function single(re: RegExp, str: string) {
  const exec = re.exec(str)
  if (!exec) return []

  const [, ...captures] = exec
  return captures
}

export default function capture(re: RegExp, str: string) {
  return re.global ? all(re, str) : single(re, str)
}
