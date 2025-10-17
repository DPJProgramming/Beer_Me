window.onload = function() {    
    const form = document.getElementById("newBeerForm");
    form.addEventListener("submit", validate); 
}

function validate(event){
    event.preventDefault();
    const isValid = areFieldsValid();

    if(!isValid){
        return;
    }
    else{
        getNewBeerInfo(event);
    }
}

function areFieldsValid(){
    let valid = true;
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const rating = document.getElementById("rating").value;
    const upload = document.getElementById("upload");
    const image = upload.files[0];
    const imageValid = document.getElementById("imageValid");

    const nameValid = document.getElementById("nameValid");
    const typeValid = document.getElementById("typeValid");
    const ratingValid = document.getElementById("ratingValid");

    if(!name){
        nameValid.textContent = "Name is required";
        valid = false;
    }
    else{
        nameValid.textContent = "";
    }
    if(!type){
        typeValid.textContent = "Type is required";
        valid = false;
    }
    else{
        typeValid.textContent = "";
    }
    if(!rating || isNaN(rating) || rating < 1 || rating > 5){
        ratingValid.textContent = "Rating is required and must be a number between 1 and 5";
        valid = false;
    }
    else{
        ratingValid.textContent = "";
    }
    if(image){
        const types = ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/heif'];
        if(!types.includes(image.type)){
            imageValid.innerText = "Invalid image type. Allowed types: JPEG, PNG, GIF, HEIC, HEIF.";
            valid = false;
        }
        else{
            imageValid.innerText = "";
        }
    }
    return valid;
}

function getNewBeerInfo(event){
    event.preventDefault();

    //get form info
    const newBeer = new FormData(event.target);

    //send beer to backend
    addBeer(newBeer);
}

async function addBeer(newBeer){
    const config = {
        method:"post",
        mode: "cors",
        body: newBeer
    }
    const response = await fetch('/addBeer', config);

    console.log(response);

    //TO DO:
    //handle response
}
