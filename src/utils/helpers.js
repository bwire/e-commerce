export const formatPrice = (price) => {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(price / 100);
};

export const getUniqueValues = (array, field) => [
  ...new Set(array.flatMap((e) => e[field])),
];
