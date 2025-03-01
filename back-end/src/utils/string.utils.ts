export const cleanUpString = (str: string): string => {
  // remove all space and convert to lower case
  return str.replace(/\s+/g, '').toLowerCase();
};

export const cleanCategory = (category: string): string => {
  // remove starting and trailing spaces and make first letter capital
  return (
    category.trim().charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  );
};
