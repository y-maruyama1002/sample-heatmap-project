"use strict";


const canvas = document.getElementById("c");
const heatMap = document.getElementById("heatmap");
const wt = heatMap.clientWidth;
const ht = heatMap.clientHeight;
canvas.width = wt;
canvas.height = ht;
const ctx = canvas.getContext("2d");

// topPosition:画面上部の位置
// bottomPosition:画面下部の位置
// passTime:topとbottomの間を見ていた時間
const attentionDatas = [
    {
        topPosition: 400,
        bottomPosition: 900,
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

const createAttentionHeatMap = function(attentionDatas) {
  for(let attentionData of attentionDatas) {
    for(let i = 0; i < attentionData.passTime; ++i) {
      let gradient = ctx.createLinearGradient(500, attentionData.topPosition, 500, attentionData.bottomPosition);
      gradient.addColorStop(0.0, 'rgba(0, 0, 0, 0.2)');
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.rect(0, attentionData.topPosition, wt, attentionData.bottomPosition);
      ctx.fill();
      colorize(attentionData.topPosition, attentionData.bottomPosition);
    }
  }
}
// 配列の中身の数×見た時間　だけ色付けを行う

createAttentionHeatMap(attentionDatas);

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