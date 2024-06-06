function plasticColor(text: string) {
  // Indicates whether there is a pattern in a text using 'test'
  if (text && /\s/.test(text)) {
    return text.split(" ").join("-").toLowerCase();
  }
}

export { plasticColor };
