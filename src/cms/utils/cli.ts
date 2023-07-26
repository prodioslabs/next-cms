export const CLI_STYLES = {
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  DIM: '\x1b[2m',
  UNDERSCORE: '\x1b[4m',
  BLINK: '\x1b[5m',
  REVERSE: '\x1b[7m',
  HIDDEN: '\x1b[8m',

  BLACK: '\x1b[30m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  GRAY: '\x1b[90m',

  BG_BLACK: '\x1b[40m',
  BG_RED: '\x1b[41m',
  BG_GREEN: '\x1b[42m',
  BG_YELLOW: '\x1b[43m',
  BG_BLUE: '\x1b[44m',
  BG_MAGENTA: '\x1b[45m',
  BG_CYAN: '\x1b[46m',
  BG_WHITE: '\x1b[47m',
  BG_GRAY: '\x1b[100m',
} as const

export function eventMessage(message: string) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.BLUE}event${CLI_STYLES.RESET} ${message}`
}

export function warnMessage(message: string) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.YELLOW}warn${CLI_STYLES.RESET} ${message}`
}

export function errorMessage(message: string) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.RED}error${CLI_STYLES.RESET} ${message}`
}

export function successMessage(message: string) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.GREEN}success${CLI_STYLES.RESET} ${message}`
}
