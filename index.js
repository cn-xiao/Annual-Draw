const people = ["黄先森","李先森","夏女士"],
    ulWidth = people.length * 600;
var timerId, prizeName;
/**
 * 页面加载完成时执行
 */
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
/**
 * 定时器
 */
function cycle() {
    document.getElementById("list").appendChild(document.getElementsByTagName("li")[0]);
    timerId = setTimeout('cycle()', 100);
}
/**
 * 结束后运行
 */
function stoped() {
    window.clearTimeout(timerId);
    var winner = document.getElementsByTagName("li")[0].querySelector("img").getAttribute("title");
    alert("获奖者是：" + winner + "，恭喜您抽中“" + prizeName + "”！");
    let li = document.createElement("li");
    li.innerHTML = prizeName + "：" + winner;
    document.getElementById("winner").appendChild(li);
    document.getElementById("start").disabled = false;
    document.getElementById("order").disabled = false;
}
/**
 * 结束抽奖
 */
function stop() {
    document.getElementById("stop").disabled = true;
    var time = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
    console.info(time / 1000 + "s后停止。");
    setTimeout("stoped()", time);
}
/**
 * 开始抽奖
 */
function start() {
    prizeName = window.prompt("请输入本次抽奖奖品：");
    if (prizeName) {
        cycle();
        document.getElementById("start").disabled = true;
        document.getElementById("order").disabled = true;
        document.getElementById("stop").disabled = false;
    };
}
/**
 * 打乱排序
 */
function randomArray() {
    const el = document.getElementById("list");
    if (el !== null) {
        el.parentNode.removeChild(el);
    };
    let library = document.createElement("ul");
    library.setAttribute("id", "list");
    library.style.width = ulWidth + "px";
    people.sort(function() {
        return (0.5 - Math.random());
    });
    people.map(function(value, index) {
        let img = new Image();
        img.src = "./images/" + value + ".jpg";
        img.setAttribute("title", value);
        let li = document.createElement("li");
        li.appendChild(img);
        library.appendChild(li);
    });
    document.getElementById("library").appendChild(library);
}
ready(function() {
    randomArray();
});
window.onbeforeunload = function(e) {
    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
        e.returnValue = '关闭提示';
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return '关闭提示';
};