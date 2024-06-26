function plasticColor(category: string) {
  // Indicates whether there is a pattern in a text using 'test'
  if (category && /\s/.test(category)) {
    return category.split(" ").join("-").toLowerCase();
  }
}

export { plasticColor };
