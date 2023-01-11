function handleplay() {
  if (document.getElementById("action").classList.contains('active')) {
    document.getElementById("product-image").src = "./images/sofa.png"
    document.getElementById("action-image").src = "./images/360.png"
    document.getElementById("action").classList.remove('active')
  } else {
    document.getElementById("product-image").src = "./images/sofa.gif"
    document.getElementById("action-image").src = "./images/close.png"
    document.getElementById("action").classList.add('active')
  }
}