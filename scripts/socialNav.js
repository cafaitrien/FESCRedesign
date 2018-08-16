var socialMedia = [{
  url: "https://www.facebook.com",
  name: "fa fa-facebook",
  style: "font-size:24px;color:white"
}, {
  url: "https://www.twitter.com",
  name: "fa fa-twitter",
  style: "font-size:24px;color:white"
  }, {
    url: "https://www.youtube.com",
    name: "fa fa-youtube",
    style: "font-size:24px;color:white"
},
{
  url: "https://www.instagram.com",
  name: "fa fa-instagram",
  style: "font-size:24px;color:white"
}]

Vue.component('navlink', {
  template:'<a :href="url" class="socialicons"><i class="name" style=font-size:24px;color:white> </a>',
  props:['url', 'name']
})

document.addEventListener("DOMContentLoaded", function() {
  let socialNav = new Vue({
    el: '#socialNav',
    data: {
      profiles: socialMedia
    }
  })
})
