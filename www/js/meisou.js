var PassSec; //秒数カウント
var watchID;
var freq = 1000 //取得頻度関連
var Threashold = 15 //アウトの閾値


function send_data(){
    
    var userId = getUserInfo();
    var data = {timecount: PassSec, username: userId};
    /*
    $.post("https://meditation-hack.herokuapp.com/updateTime?username=name2&timecount=7", data).done(function(data) {
         //document.getElementById("res").innerHTML="suc";
     }).fail(funcion(){
         //document.getElementById("res").innerHTML="fal";
     });
    //document.getElementById("res").innerHTML="fal";
    */
    
    $.post("https://meditation-hack.herokuapp.com/updateTime", data, function (data) {
        alert("success:" + data);
    });
}

    

function onAcceSuccess(acceleration) { //加速度を取得して表示
    document.getElementById("accelerationX").innerHTML=acceleration.x;
    document.getElementById("accelerationY").innerHTML=acceleration.y;
    document.getElementById("accelerationZ").innerHTML=acceleration.z;

    // 閾値超えてないかの判定
    res=Math.abs(acceleration.x)+Math.abs(acceleration.y)+Math.abs(acceleration.z);
    document.getElementById("sum").innerHTML=res;
    
    if(res>Threashold){
        send_data();
        timerStop();
    }
}

function onAcceError() {
    console.log('onAcceError!');
};
var acceOptions = { //取得頻度
    frequency: freq
};

// 繰り返し処理の中身
function counter() {
    PassSec++;   // カウントアップ
    // PassSec=Math.round(PassSec*10)/10;
    var msg = "ボタンを押してから " + PassSec.toFixed(1) + "秒が経過しました。";   // 表示文作成
    document.getElementById("visi").innerHTML = msg;   // 表示更新
}

function timerStart(){
    // document.getElementById("visi").innerHTML="test";
    
    PassSec = 0; //カウンタリセット
    PassageID = setInterval('counter()',freq);
    document.getElementById("startCount").disabled = true;   // 開始ボタンの無効化
    // 加速度取得　開始
    watchID = navigator.accelerometer.watchAcceleration(onAcceSuccess, onAcceError, acceOptions);
    onAcceSuccess(acceleration);
}
function timerStop(){
    // document.getElementById("visi").innerHTML="end";
    
    clearInterval( PassageID );   // タイマーのクリア
    document.getElementById("startCount").disabled = false;   // 開始ボタンの有効化
    // 加速度取得　終了
    navigator.accelerometer.clearWatch(watchID);
}