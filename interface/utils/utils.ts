const capitalizeFirstLetter = (content: string): string => {
  if (content.length === 0) {
    return content;
  }

  return content.charAt(0).toUpperCase() + content.slice(1);
};

const abbreviateEthereumAddress = (address: string): string => {
  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);

  return `${prefix}...${suffix}`;
};

export { capitalizeFirstLetter, abbreviateEthereumAddress };
