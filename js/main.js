/**
 * Created by Sorumi on 16/3/2.
 */
window.onload = function() {
    navOnClick();
    updateNav();
    addAnimate();
    animatedReady();
    navHidden();
}

window.onscroll = function() {
    updateNav();
    updateLogo();
    animatedReady();
}

function submit()
{
    var data = {
        name: $("#name").val(),
        number: $("#number").val(),
        sex: $("#sex").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        depart: $("#group option:selected").text(),
        expr: $("#intro").val(),
        hobby: $("#hobby").val(),
    };

    $("#submit").attr('disabled', 'disabled');

    $.post("/b.php",data,function(text){
        $("#success").text(text);

        if(text === "信息不完整，请重新输入！"){
            $("#submit").removeAttr('disabled')
        }else{

        }
    })

}

function addAnimate() {
    $(".banner").addClass("animated-ready").attr("href","fadeIn");
    $(".about .icons").addClass("animated-ready").attr("href","fadeIn");
    $(".time-line-info").addClass("animated-ready").attr("href","fadeIn");

    $(".tl-image1").addClass("animated-ready").attr("href","fadeIn");
    $(".tl-pc").addClass("animated-ready").attr("href","bounceIn");
    $(".tl-table").addClass("animated-ready").attr("href","bounceInDown");
    $(".tl-build").addClass("animated-ready").attr("href","slideInUp");

    $(".photo-wrapper").addClass("animated-ready").attr("href","zoomInUp");
    $(".depart .icon-wrapper").addClass("animated-ready").attr("href","zoomIn");
    $(".member-wrapper").addClass("animated-ready").attr("href","fadeIn");
    $(".join-form").addClass("animated-ready").attr("href","fadeInUp");
    $("#submit").addClass("animated-ready").attr("href","shake");

}

function updateNav() {
    var links = document.querySelectorAll(".menu a")

    for(var i = 0; i < links.length; i++) {
        var link = links[i];

        // 获取被链接指向的部分
        var section = document.querySelector(link.getAttribute("href"));
        var sectionTop = section.offsetTop;
        var sectionBottom = section.offsetTop + section.clientHeight;

        // 检查 window.scrollY 是否在这部分中
        if(window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            $(link).addClass("active");
        } else {
            $(link).removeClass("active");
        }
    }

}

function updateLogo() {
    var height = window.scrollY;
    var logoSmall = $(".logo-small");
    var navDefault = $(".nav").css("padding-top");
    if (height>40) {
        $(".nav").css("padding-top","20px").css("position","fixed");
        logoSmall.removeClass("animated zoomOut");
        logoSmall.addClass("animated zoomIn");
        logoSmall.css("opacity","1");
    }else{
        $(".nav").css("padding-top",navDefault).css("position","absolute");
        if (logoSmall.css("opacity") == "1"){
            logoSmall.removeClass("animated zoomIn");
            logoSmall.addClass("animated zoomOut");
        }
    }
}

function animatedReady() {
    var ready = document.getElementsByClassName("animated-ready");

    for(var i = 0; i < ready.length; i++) {
        var ar = ready[i];
        var top = getTop(ar);
        if(((document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) + $(window).height()) > top) {

            var animateType = $(ar).attr("href");
            $(ar).addClass("animated "+animateType);
            $(ar).css("visibility","visible");
        }

    }
}

function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
    return offset;
}

function navOnClick() {
    $(".nav-icon").click(function(){
        $(".menu").slideToggle("");
    })
}
function navHidden() {

    if(!isPC()){
        $("input").on("focus", function(e) {
            $(".nav").hide();
        }).on("blur", function(e) {
            $(".nav").show();
        });
        $("select").on("focus", function(e) {
            $(".nav").hide();
        }).on("blur", function(e) {
            $(".nav").show();
        });
        $("textarea").on("focus", function(e) {
            $(".nav").hide();
        }).on("blur", function(e) {
            $(".nav").show();
        });
    }
}
function isPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false; break;
        }
    }
    return flag;
}
jQuery(document).ready(function($) {
    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });

});

