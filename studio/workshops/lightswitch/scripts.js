// get the button elements
var onButton = document.querySelector('button[name="on"]');
var offButton = document.querySelector('button[name="off"]');

//log the elements to the console 
console.log(onButton);
console.log(offButton);

//get the lightbulb element
var lightbulb = document.querySelector('.lightbulb');

//log the elements to the console
console.log(lightbulb);

//add event listener to on button
onButton.addEventListener('click', () => {

    //add the is-on class to the lightbulb element
    lightbulb.classList.add('is-on');

});

//add event listener to on button
offButton.addEventListener('click', () => {

    //remove the is-on class to the lightbulb element
    lightbulb.classList.remove('is-on');

});