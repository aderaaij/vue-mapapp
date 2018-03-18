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

export function getClosest(elem, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
}

// ➡️ Offset the map when a marker is too close to the edge for all sides but the bottom
export function offSetMarker(marker, markerGrowSize, map) {
  /* 
   * Set the max width and height of the marker and shrink it a bit by multiplying with 0.x. 
   * This is to compensate for padding around the marker
   */

  const markerMaxWidth = marker.offsetWidth * markerGrowSize * 0.55;
  const markerMaxHeight = marker.offsetHeight * markerGrowSize * 0.7;
  const markerOffSetX = getComputedTranslateXY(marker.parentNode)[0];
  const markerOffSetY = getComputedTranslateXY(marker.parentNode)[1];
  if (
    markerOffSetY < markerMaxHeight ||
    markerOffSetX < markerMaxWidth ||
    getWindowXYSize()[0] - markerOffSetX < markerMaxWidth + marker.offsetWidth
  ) {
    let offSetY = 0;
    let offSetX = 0;

    if (markerOffSetY < markerMaxHeight) {
      offSetY = markerOffSetY - markerMaxHeight;
    }

    if (markerOffSetX < markerMaxWidth) {
      offSetX = markerOffSetX - markerMaxWidth;
    }
    // Add `marker.offsetWidth` to this calculation because the position is calculated from top-left
    if (
      getWindowXYSize()[0] - markerOffSetX <
      markerMaxWidth + marker.offsetWidth
    ) {
      offSetX =
        markerMaxWidth +
        marker.offsetWidth -
        (getWindowXYSize()[0] - markerOffSetX);
    }

    map.panBy([offSetX, offSetY]);
  }
}

/**
 * Dank function to keep track of animations / timelines by registering them,
 * gives us the option to stop them when needed
 */
export const playback = () => {
  const animations = [];
  return {
    register: animation => {
      animations.push(animation);
    },
    stop: () => {
      animations.forEach(animation => animation.stop());
      animations.length = 0;
    },
  };
};

export function titleSplit(title) {
  const titleArr = title.split(' ');
  const titleLast = titleArr.slice(
    Math.ceil(titleArr.length / 2),
    titleArr.length
  );
  const titleFirst = titleArr.slice(0, Math.ceil(titleArr.length / 2));
  return {
    first: titleFirst.join(' '),
    last: titleLast.join(' '),
  };
}
