var permission = Notification.permission;

if (permission === "granted"){

  document.getElementById("p1").style.visibility = "hidden";
  document.getElementById("p2").style.visibility = "visible";
  document.getElementById("p3").style.visibility = "visible";
  
}
