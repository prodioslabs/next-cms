import { parseISO } from 'date-fns'

export function parseDate(dateStr: string) {
  const parsedDate = parseISO(dateStr)
  if (isNaN(parsedDate.getTime())) {
    return undefined
  }
  return parsedDate
}

export function stringifyDate(date: Date) {
  return date.toISOString()
}
