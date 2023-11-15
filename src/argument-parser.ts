export const longFormArgumentFrom = (args: string[], name: string, fallback: string) => {
  const argLong = `--${name}`
  const found = args.findIndex((value) => value === argLong)
  if (found === -1) {
    return fallback
  }
  const arg = args[found + 1]
  if (arg === undefined) {
    throw new Error(`${argLong} needs an argument`)
  }
  return arg
}

export const longFormFlagFrom = (args: string[], name: string, fallback: boolean) => {
  const found = args.includes(`--${name}`)
  if (found) {
    return found
  }
  return fallback
}
