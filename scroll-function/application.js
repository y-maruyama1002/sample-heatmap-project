
let maxScroll = 0;
let watchedArea = 0;
let maxWatchedPercent = 0;
window.onscroll = function () {
    let scroll = window.pageYOffset; 　// 初期値：０。何ピクセルスクロールしたか
    let documentHeight = document.documentElement.scrollHeight;　// ウェブページの高さが何ピクセルあるか
    let viewHeight = document.documentElement.clientHeight;　// エンドユーザーの使っているデバイスの画面が何ピクセル表示しているか
    let scrollHeight = scroll + viewHeight; 　　// エンドユーザーが何ピクセル分見ることができたか
    let scrollPercent = Math.floor(scrollHeight / documentHeight * 100); // ドキュメントハイトを100として、何パーセントエンドユーザーが見たか
    if (maxScroll < scroll) {
        maxScroll = scroll;
    }
    if (watchedArea < scrollHeight) {
        watchedArea = scrollHeight;
    }
    if(maxWatchedPercent < scrollPercent) {
        maxWatchedPercent = scrollPercent;         // それぞれの最大値を取得する
    }
    let scrolledPixel = document.getElementById("scrolled-pixel");
    let viewheightScroll = document.getElementById("viewheight-scroll");
    let watchedPercent = document.getElementById("watched-percent");
    scrolledPixel.innerHTML = maxScroll;
    viewheightScroll.innerHTML = watchedArea;
    watchedPercent.innerHTML = maxWatchedPercent;
}
