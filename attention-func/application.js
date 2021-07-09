let PassSec = 0;

window.onscroll = function () {
    PassSec = 0;
    clearInterval( PassageFunc );
    startCount();
    console.log("call me?")
    let topPosition = window.pageYOffset; 　// 初期値：０。何ピクセルスクロールしたか
    let viewHeight = document.documentElement.clientHeight;　// エンドユーザーの使っているデバイスの画面が何ピクセル表示しているか
    let bottomPosition = topPosition + viewHeight;
    document.getElementById("scrolled-pixel").innerHTML = topPosition + "pixel to " + bottomPosition + "pixel."
    // データベースへtopPosition, bottomPosition, PassSecの値を送信
}
let startCount = function () {
    PassageFunc = setInterval('Counting()', 1000);
}

function Counting() {
    PassSec++;
    let msg = "You watched " + PassSec + " second here.";
    document.getElementById("PassageArea").innerHTML = msg;
}

startCount();
