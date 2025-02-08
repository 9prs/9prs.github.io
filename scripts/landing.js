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
    
    let maximumQuestionsLimit = document.querySelector('#questions').value;
    let selectedSubject = document.querySelector('#subject').value;
    let testTime = document.querySelector('#time').value;

    console.log(maximumQuestionsLimit)
    console.log(selectedSubject)
    console.log(testTime)
})