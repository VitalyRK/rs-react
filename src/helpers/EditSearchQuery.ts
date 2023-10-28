export const EditSearchQuery = (value: string): string[] => {
  const result = value.trim().split(' ');
  return result;
};
