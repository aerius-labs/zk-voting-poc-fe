export function convertTimestampToReadableDate(timestamp: number) {
  // JavaScript uses milliseconds for Date, so we need to convert Unix timestamp (seconds) to milliseconds
  const date = new Date(timestamp * 1000);

  // Set options for toLocaleString
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
  };

  // Use toLocaleString to convert the date to a string in the format you want
  const readableDate = date.toLocaleString('en-US', options);

  return readableDate;
}
