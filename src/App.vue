<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
import "./assets/css/fonts.css"
export default {
  name: 'App',

  data: () => ({
    //
    color: "transparent",
    colo: "white",
  }),
  mounted() {
    // const navbar = document.getElementById("nav-bar");
    // window.addEventListener("scroll", () => {
    //   if (window.scrollY > 20) {
    //     this.color = "whitesmoke";
    //     this.colo = "grey";
    //     navbar.classList.add("scale-in-center");
    //   } else {
    //     this.color = "transparent";
    //     this.colo = "white";
    //     navbar.classList.remove("scale-in-center");
    //     navbar.classList.add("scale-out-center");
    //   }
    // });
  },
};
</script>
<style>
.footer{
  padding:4%;
}
@media screen and (max-width:600px) {
 .footer{
  padding:10%;
} 

}
</style>

