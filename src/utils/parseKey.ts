const parseKey = (key: string) => {
  return key.replaceAll('_', ' ').replace(/^\w/, (match) => match.toUpperCase());
};

export default parseKey;
