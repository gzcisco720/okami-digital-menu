export const cleanUpString = (str: string): string => {
  // remove all space and convert to lower case
  return str.replace(/\s+/g, '').toLowerCase();
};
