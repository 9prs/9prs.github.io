export let selectedSubject;
export let maximumQuestionsLimit;
export let testTime;

import {app} from "./script.js";

document.addEventListener('DOMContentLoaded',function(){
    setTimeout(() => {
        document.querySelector('.loader').style.top = '-100%';
    }, 3000);
    setTimeout(()=>{
        document.querySelector('.loader').remove;
    },4000)
})

setTimeout(()=>{
    document.querySelector('#home').style.display = 'block'
        document.querySelector('#contents .icon').addEventListener('click', function () {
            document.querySelector('#home').style.maxHeight = 'fit-content';
            document.querySelector('.about').style.height = `${document.querySelector('#home').offsetHeight}px`;
            document.querySelector('.about').style.transform = 'translateX(0%)';
        })
        document.querySelector('.about .icon').addEventListener('click', function () {
            document.querySelector('.about').style.transform = 'translateX(100%)';
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
            },720)
            app();
            setTimeout(()=>{

            },400)
            console.log(maximumQuestionsLimit)
            console.log(selectedSubject)
            console.log(testTime)
        })
        
},3100)