export let selectedSubject;
export let maximumQuestionsLimit;
export let testTime;

import {app} from "./script.js";
import { data } from "./script.js";

document.addEventListener('DOMContentLoaded',function(){
    setTimeout(() => {
        document.querySelector('.loader').style.top = '-100vh';
    }, 1000);
    setTimeout(()=>{
        document.querySelector('.loader').remove;
    },4000)
})

setTimeout(()=>{
    document.querySelector('#home').style.display = 'block'
        document.querySelector('#contents .icon').addEventListener('click', function () {
            document.querySelector('.wrapper').style.maxHeight = `${document.querySelector(".about").offsetHeight}px`;
            document.querySelector('#home').style.maxHeight = 'fit-content';
            document.querySelector('.about').style.height = `${document.querySelector('#home').offsetHeight}px`;
            document.querySelector('.about').style.transform = 'translateX(0%)';
            
        })
        document.querySelector('.about .icon').addEventListener('click', function () {
            document.querySelector('.about').style.transform = 'translateX(100%)';
            document.querySelector('.wrapper').style.maxHeight = '100vh';
            document.querySelector('#home').style.maxHeight = '100vh';
        })
        
        document.querySelector('.cta button').addEventListener('click',function(){
            
            maximumQuestionsLimit = document.querySelector('#questions').value;
            selectedSubject = document.querySelector('#subject').value;
            testTime = document.querySelector('#time').value;

            setTimeout(() => {
                    document.querySelector('#home').style.transform = 'translateX(100%)';
            }, 350);
            setTimeout(() => {
                document.querySelector('#home').remove;
            }, 700);
            setTimeout(()=>{
                document.querySelector('#main').style.display = 'flex';
            },700)
            setTimeout(()=>{
                document.querySelector('#main').style.transform = 'translateY(-100%)'
            },720);
            if (document.querySelector('#main').getBoundingClientRect().top + window.scrollY <= 0) {
            
                if (data.length == 0) {
                    document.querySelector('.popup').textContent = "We are getting the data..."
                    document.querySelector('.popup').style.opacity = 1;
                    let checkData = setInterval(() => {
                        if (data.length > 0) {
                            document.querySelector('.popup').style.opacity = 0;
                            document.querySelector('.popup').textContent = "";
                            clearInterval(checkData); 
                        }
                    }, 200);                    
                }
            
                if (data.length > 0) {
                    return;
                }
            }
            
            app();
        })
        
},100)

$(document).ready(function () {
    var owl = $(".carousel-founders");
    owl.owlCarousel({
        loop: true,
        margin: 450,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
});