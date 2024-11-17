export function formatTime(numInSeconds: number): string {
  // Calculate the number of hours by dividing num by 60 and rounding down
  let seconds = Math.floor(numInSeconds % 60);
  let minutes = Math.floor(numInSeconds / 60);
  let hours = Math.floor(minutes / 60);

  minutes = Math.floor(minutes % 60);

  let secondsString = seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  let minutesString = minutes.toLocaleString("en-US", {
    minimumIntegerDigits: hours ? 2 : 1,
  });

  return (hours ? hours + ":" : "") + minutesString + ":" + secondsString;
}
