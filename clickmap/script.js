"use strict";

const heatmapApp = (function () {
  // let definition
  // canvas: the canvas element
  // ctx: the canvas 2d context
  // width: the heatmap width for border calculations
  // height: the heatmap height for border calculations
  let canvas,
    ctx,
    width,
    height,
    radius1 = 1,
    radius2 = 5,
    // function for coloring the heatmap
    colorize = function (x, y, x2) {
      // initial check if x and y is outside the app
      // -> resetting values
      if (x + x2 > width) x = width - x2;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (y + x2 > height) y = height - x2;
      // get the image data for the mouse movement area
      let image = ctx.getImageData(x, y, x, x),
        // some performance tweaks
        imageData = image.data,
        length = imageData.length;

      // loop thru the area
      for (let i = 3; i < length; i += 4) {
        let r = 0,
          g = 0,
          b = 0,
          tmp = 0,
          // &#91;0&#93; -> r, [1] -> g, [2] -> b, [3] -> alpha
          alpha = imageData[i];
        // coloring depending on the current alpha value
        if (alpha <= 255 && alpha >= 235) {
          tmp = 255 - alpha;
          r = 255 - tmp;
          g = tmp * 12;
        } else if (alpha <= 234 && alpha >= 200) {
          tmp = 234 - alpha;
          r = 255 - tmp * 8;
          g = 255;
        } else if (alpha <= 199 && alpha >= 150) {
          tmp = 199 - alpha;
          g = 255;
          b = tmp * 5;
        } else if (alpha <= 149 && alpha >= 100) {
          tmp = 149 - alpha;
          g = 255 - tmp * 5;
          b = 255;
        } else b = 255;
        // we ve started with i=3
        // set the new r, g and b values
        imageData[i - 3] = r;
        imageData[i - 2] = g;
        imageData[i - 1] = b;
      }
      // the rgb data manipulation didn't affect the ImageData object(defined on the top)
      // after the manipulation process we have to set the manipulated data to the ImageData object
      ctx.putImageData(image, x, y);
    },
    // this handler is listening to the click event of the user
    clickEvent = function (ev) {
      // get the x and y values of the user's click position
      let x, y;
      x = ev.pageX;
      y = ev.pageY;
      if (typeof x === undefined) return;

      // storing the variables because they will be often used
      let r1 = radius1;
      let r2 = radius2;

      // create a radial gradient with the defined parameters. we want to draw an alphamap
      let rgr = ctx.createRadialGradient(x, y, r1, x, y, r2);
      // the center of the radial gradient has .1 alpha value
      rgr.addColorStop(0, "rgba(0,0,0,0.1)");
      // and it fades out to 0
      rgr.addColorStop(1, "rgba(0,0,0,0)");
      // drawing the gradient
      ctx.fillStyle = rgr;
      ctx.fillRect(x - r2, y - r2, 2 * r2, 2 * r2);
      // at least colorize the area
      colorize(x - r2, y - r2, 2 * r2);
    };

  return {
    // initialization
    initialize: function (c, wt, ht) {
      canvas = document.getElementById(c);
      canvas.width = wt;
      canvas.height = ht;
      ctx = canvas.getContext("2d");
      width = wt;
      height = ht;
      canvas["onclick"] = function (ev) {
        clickEvent(ev);
      };
    },
    // if you like to process the image data e.g onbeforeunload
    // just call the getData method -> returns imagedata as a dataurl string
    getData: function () {
      return canvas.toDataURL();
    },
  };
})();

window["onload"] = function () {
  const heatMap = document.getElementById("heatmap");
  let w = heatMap.clientWidth;
  let h = heatMap.clientHeight;
  //call the initialization
  heatmapApp.initialize("c", w, h);
};

let coordinates = [
  [267, 79],
  [412, 130],
  [476, 149],
  [475, 182],
  [320, 228],
  [287, 213],
  [280, 158],
  [334, 131],
  [505, 175],
  [571, 230],
  [614, 253],
  [672, 318],
  [503, 343],
  [305, 277],
  [270, 248],
  [206, 220],
  [120, 167],
  [160, 96],
  [453, 128],
  [649, 119],
  [666, 167],
  [580, 261],
  [325, 290],
  [339, 261],
  [434, 225],
  [326, 106],
  [13, 148],
  [108, 355],
  [134, 405],
  [117, 459],
  [111, 485],
  [528, 461],
  [568, 423],
  [555, 312],
  [724, 122],
  [735, 135],
  [681, 73],
  [681, 73],
  [681, 73],
  [681, 73],
  [678, 72],
  [676, 71],
  [676, 71],
  [683, 67],
  [684, 71],
  [681, 73],
  [679, 72],
  [679, 65],
  [682, 67],
  [685, 77],
  [682, 77],
  [681, 73],
  [680, 75],
  [675, 71],
  [675, 63],
  [679, 72],
  [677, 73],
  [676, 70],
  [667, 89],
  [673, 70],
  [672, 74],
  [673, 75],
  [670, 77],
  [670, 76],
  [676, 73],
  [677, 73],
  [678, 75],
  [678, 75],
  [685, 79],
  [684, 71],
  [671, 64],
  [570, 73],
  [393, 83],
  [384, 73],
  [405, 65],
  [476, 120],
  [339, 299],
  [212, 296],
  [168, 195],
  [368, 181],
  [634, 148],
  [572, 90],
  [448, 105],
  [312, 270],
  [290, 345],
  [247, 439],
  [248, 440],
];

// document.addEventListener("click", function (e) {
//   coordinates.push([e.clientX, e.clientY]);
// });
