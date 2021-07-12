"use strict";


// this is datas of viewheight + scroll it means how many below did enduser achieved.
const scrollCoordinates = [1000, 2000, 3000, 500, 2500, 1500, 1000, 2000, 3000, 500, 2500, 1500, 1000, 2000, 3000, 500, 2500, 1500, 1000, 2000, 3000, 500, 2500, 1500, ];

const canvas = document.getElementById("c");
const heatMap = document.getElementById("heatmap");
const wt = heatMap.clientWidth;
const ht = heatMap.clientHeight;
canvas.width = wt;
canvas.height = ht;
const ctx = canvas.getContext("2d");

const createScrollHeatMap = function (scrollCoordinates) {
    for(let y of scrollCoordinates) {
        let gradient = ctx.createLinearGradient(500, 0, 500, y);
        gradient.addColorStop(0.0, 'rgba(0, 0, 0, 0.05)');
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.rect(0, 0, wt, ht);
        ctx.fill();
        colorize(y);
    }
};

createScrollHeatMap(scrollCoordinates);

function colorize(y) {
    let image = ctx.getImageData(0, 0, wt, y),
    imageData = image.data,
    length = imageData.length;
  for (let i = 3; i < length; i += 4) {
    let r = 0,
      g = 0,
      b = 0,
      tmp = 0,
      alpha = imageData[i];
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
    imageData[i - 3] = r;
    imageData[i - 2] = g;
    imageData[i - 1] = b;
  }
  ctx.putImageData(image, 0, 0);
}
