export const GenerateRandomStrings = () => {
  const characters = "0123456789abcdef";
  let result = "";

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      result += "-";
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  }

  return result;
};
