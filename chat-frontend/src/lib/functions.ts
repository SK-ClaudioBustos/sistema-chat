export const sanitizeUsername = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "_");
};

export const validateUsername = (name: string): boolean => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};
