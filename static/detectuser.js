function detectUser() {
    var permission = Notification.permission;
    if (permission === "granted") {
        document.getElementById("p1").style.display = "none";
        document.getElementById("p2").style.display = "block";
        document.getElementById("p3").style.display = "inline-block";
    }
}
