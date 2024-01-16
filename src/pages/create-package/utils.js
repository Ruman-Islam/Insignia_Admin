export const addPrice = (prices, values, item, option) => {
  if (values[item]) {
    prices.push({ option, price: values[item] });
  }
};
