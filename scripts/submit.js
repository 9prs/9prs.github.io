const submit = document.querySelector('.submit');
const mainApp = document.querySelector('#questions-app');
const warning = document.querySelector('.warning');

submit.addEventListener('click', function () {
    if (answeredQuestions.length < askedQuestions.length) {
        warning.style.display = 'flex';
        warning.innerHTML = `<div class="txts"><h3>All questions are not answered yet...</h3><br><h5>Are you sure you want to submit the test?</h5></div><div class='btns'><div class="close"><i class="ri-close-circle-fill"></i></div><div class="confirm"><i class="ri-checkbox-circle-fill"></i></div></div>`;
    }
    else {
        location.reload();
    }
})

warning.addEventListener('click', function (e) {
    if (e.target.classList.contains('ri-close-circle-fill') || e.target.classList.contains('close')) {
        warning.style.display = 'none';
    }
    if (e.target.classList.contains('ri-checkbox-circle-fill' || e.target.classList.contains('confirm'))){
        console.log('Test Submitted...')
    }
})