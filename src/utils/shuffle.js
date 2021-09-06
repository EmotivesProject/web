function shuffle(a) {
  const funcArray = a;
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    funcArray[i] = a[j];
    funcArray[j] = x;
  }
  return funcArray;
}

export default shuffle;
