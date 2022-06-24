const iconoMenu=document.querySelector(".movil-menu");iconoMenu.addEventListener("click",navegacionResponsive);const enlances=document.querySelectorAll(".navegacion A");for(var i=0;i<=enlances.length;i++)enlances[i].addEventListener("click",ocultar);function navegacionResponsive(){document.querySelector(".navegacion").classList.toggle("set")}function ocultar(){document.querySelector(".navegacion").classList.remove("set")}

jQuery(document).ready(function(){
  jQuery('#carousel').carousel({
    interval:100,
  })
});