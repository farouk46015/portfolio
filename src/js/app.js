import '../scss/style.scss';
import 'animate.css';
import 'foundation-sites';
import $ from 'jquery';
import '../plugins/jquery.viewportchecker.min';

import Masonry from 'masonry-layout';
 
 
let imagesLoaded = require('imagesloaded');
window.$ = $;
window.jQuery = $ ;
imagesLoaded.makeJQueryPlugin( $ );

$(document).foundation();
 
if($('.po-grid') && $('.po-grid').length > 0){
    var msnry = new Masonry('.po-grid',{
        itemSelector: '.po-item',
        columnWidth: '.po-sizer',
        percentPosition: true,
        gutter: 30,
        fitWidth: true,
        stamp: '.po-stamp'
    })
}

 


$('#page-content').imagesLoaded( {},
    ()=> {
        setTimeout(()=>{
            $('#preloader').fadeOut('slow'); 
            if($('.po-grid') && $('.po-grid').length > 0){
              msnry.layout();
            }
        },1000)
    }
);




$('.po-item,.w-item').viewportChecker({
    classToAdd: 'visible animated fadeInUp',
    offset: 200,
    classToRemove: 'opacity-0'
});

$('#contact').click(()=>$('.contact-section,body').addClass('open'))
$('#closeContact').click(()=>$('.contact-section,body').removeClass('open'))


 
$( "#contactForm" ).submit(( event )=>{
    event.preventDefault();
    let jqxhr = $.post( "post.php",$( "#contactForm" ).serialize(),()=>{}).done(()=>{}).fail(()=>{});
  });

$(document).ready(()=>{
    $(window).scroll( ()=> {
        
        if ($(window).scrollTop() > 250) {
            $(".backtop").fadeIn(300);
        } else {
            $(".backtop").fadeOut(300);
        }
      })

      $(".backtop").click((event)=> {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 300);
        return false;
    })
})
  
 