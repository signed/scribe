export const longFormArgumentFrom = (args: string[], name: string, fallback: string) => {
  const found = args.findIndex((value) => value === `--${name}`)
  if (found === -1) {
    return fallback
  }
  return args[found + 1]
}

export function longFormFlagFrom(args: string[], name: string, fallback: boolean) {
  const found = args.includes(`--${name}`)
  if (found) {
    return found
  }
  return fallback
}
