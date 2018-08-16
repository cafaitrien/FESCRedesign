Vue.component('headline', {
  template: '<img src="images/header_logo.png" alt="FESC logo" class="headerImg">'
})

document.addEventListener("DOMContentLoaded", function(){
  let headerApp = new Vue({
    el: '#headerApp'
  })
})
