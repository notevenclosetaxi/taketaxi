export const setSecondToMinute = (sectionTime: number) => {
  return Math.floor(sectionTime / 60);
};

export const wait = (timeout: number): Promise<unknown> =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
