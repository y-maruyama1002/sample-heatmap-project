"use strict";


const canvas = document.getElementById("c");
const heatMap = document.getElementById("heatmap");
const wt = heatMap.clientWidth;
const ht = heatMap.clientHeight;
canvas.width = wt;
canvas.height = ht;
canvas.style.border = "2px solid black";
const ctx = canvas.getContext("2d");

const attentionInfo = [
    {
        topPosition: 400,
        bottomPosition: 1200,
        passTime: 3,
    },
    {
        topPosition: 200,
        bottomPosition: 700,
        passTime: 4,
    },
    {
        topPosition: 2000,
        bottomPosition: 2500,
        passTime: 7,
    },
    {
        topPosition: 0,
        bottomPosition: 500,
        passTime: 6,
    }
];

// console.log(attentionInfo.map(obj => obj.topPosition)); 配列の中のオブジェクトを取得する方法
// passTimeの値だけ、topPosiitonとbottomPositionの値を使って色付けする

const createAttentionHeatMap = function () {
    for(let [topPosition, bottomPosition] of attentionCoordinates) {
        let gradient = ctx.createLinearGradient(500, topPosition, 500, bottomPosition);
        gradient.addColorStop(0.0, 'rgba(0, 0, 0, 0.1)');
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.rect(0, topPosition, wt, bottomPosition);
        ctx.fill();
        colorize(topPosition, bottomPosition);
    }
}

createAttentionHeatMap();

function colorize(topPosition, bottomPosition) {
    let image = ctx.getImageData(0, topPosition, wt, bottomPosition),
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
      ctx.putImageData(image, 0, topPosition);
}