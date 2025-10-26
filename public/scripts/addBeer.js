import validate from './validation.js';

window.onload = function() {    
    const form = document.getElementById("newBeerForm");
    form.addEventListener("submit", (event) => validate.validateForm(event, addBeer)); 
}

async function addBeer(newBeer){    
    console.log("reached addBeer");
    const config = {
        method:"post",
        mode: "cors",
        body: newBeer
    }
    const response = await fetch('/addBeer', config);

    console.log(response);

    //TO DO:
    //handle response
    if(response.ok){
        alert('Beer added successfully');
        window.location.href = 'index.html';
    }
    else{
        alert('Failed to add beer. Please try again.');
    }
}

// function validate(event){
//     event.preventDefault();
//     const newBeer = new FormData(event.target);
//     const validator = new Validate();

//     if(validator.validate(newBeer))  
//         {
//             console.log("All validations passed");
//             addBeer(newBeer);
//         }
//     else{
//         return;
//     }
// }
