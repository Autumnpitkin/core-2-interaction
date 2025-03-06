//get the press button
var pressButton = document.querySelector ('button[name="press"]');
var studentSelect = document.querySelector('select[name="student"]');
var pennySelect = document.querySelector('select[name="penny"]');
var pennyImage = document.querySelector('.penny');

//log the elements
console.log(pressButton);
console.log(pennySelect.value);

//add event listener to press button
pressButton.addEventListener('click', () => {

    //log the student value 
    console.log(studentSelect.value);

    //log the elements
    console.log(pennySelect.value);

    //set the penny image src
    // pennyImage.src = 'img/' + pennySelect.value;
    pennyImage.src = 'https://' + studentSelect.value + '.interactive.rodeo/studio/workshops/penny-presser/img/' + pennySelect.value;

    //log the penny image
    console.log(pennyImage);

});