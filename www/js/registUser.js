// Cordova がデバイスと接続するまで待機
document.addEventListener("deviceready", onLoacalStorageReady, onLoacalStorageError);
// Cordova 準備完了
function onLoacalStorageReady() {
    console.log("LocalStorage Ready");
    
    //var userInfo = getUserInfo();
    //document.getElementById('userId').value = userInfo;
}
// Cordova 準備失敗
function onLoacalStorageError(error) {
    console.log("onLoacalStorageError" + ":code=" + error.code);    
}

function saveUserId() {
    var userId = document.getElementById('userId').value;
    console.log('userId:' + userId);
    window.localStorage.setItem("userId", userId);
    
    alert("ユーザ登録しました" + userId);
}

function getUserInfo() {    
    return window.localStorage.getItem("userId");
}