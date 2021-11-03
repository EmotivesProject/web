function srcToFile(src, fileName, mimeType) {
  return (fetch(src)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], fileName, { type: mimeType }))
  );
}

export default srcToFile;
