import dayjs from 'dayjs'

import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTime)

const FULL_DATE_FORMAT = 'dddd, MMMM D, YYYY h:mm A'

export const formatDateForDisplay = (date?: string | number | Date) => {
  return dayjs(date ?? new Date()).format(FULL_DATE_FORMAT)
}

export const formatDateInSecondsForDisplay = (timeSinceUnixEpochInSeconds?: number) => {
  return formatDateForDisplay(timeSinceUnixEpochInSeconds ? timeSinceUnixEpochInSeconds * 1000 : undefined)
}

export default dayjs
