const renamer = (src, map) => {
  const dst = {};
  for (const key in src) {
    if (key in map)
    // rename key
    { dst[map[key]] = src[key]; } else
    // same key
    { dst[key] = src[key]; }
  }
  return dst;
};
export default renamer;
