//function taken from w3schools Hamburger Menu
function myFunction() {
  var x = document.getElementById("myNavbarLeft");
  if (x.className === "navbarLeft") {
    x.className += " responsive";
  } else {
    x.className = "navbarLeft";
  }
}
