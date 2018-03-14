// ⚙️ HELPERS
// Get TranslateXY values of added object, returns array `[x, y]`
// https://stackoverflow.com/questions/21912684/how-to-get-value-of-translatex-and-translatey
export function getComputedTranslateXY(obj) {
  const transArr = [];
  if (!window.getComputedStyle) return;
  const style = getComputedStyle(obj),
    transform = style.transform || style.webkitTransform || style.mozTransform;
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
  mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
  return transArr;
}

// Get X and Y Width of window
export function getWindowXYSize() {
  const windowXY = [];
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  const x = w.innerWidth || e.clientWidth || g.clientWidth;
  const y = w.innerHeight || e.clientHeight || g.clientHeight;
  windowXY.push(x, y);
  return windowXY;
}
