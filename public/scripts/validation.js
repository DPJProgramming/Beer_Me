function validateForm(event, callback){
    event.preventDefault();
    const beer = new FormData(event.target);
    let valid = true;

    if(!name(beer.get("name"))){
        valid = false;
    }
    if(!type(beer.get("type"))){
        valid = false;
    }
    if(!rating(beer.get("rating"))){
        valid = false;
    }
    if(!image(document.getElementById("image"))){
        valid = false;
    }
    if(valid){
        callback(beer);
    }
}
function name(name) {
    const nameValid = document.getElementById("nameValid");

    if (!name) {
        nameValid.textContent = "Name is required";
        return false;
    } 
    else {
        nameValid.textContent = "";
        return true;
    }
}

function type(type) {
    const typeValid = document.getElementById("typeValid");

    if (!type) {
        typeValid.textContent = "Type is required";
        return false;
    }
    else {
        typeValid.textContent = "";
        return true;
    }
}

function rating(rating) {
    const ratingValid = document.getElementById("ratingValid");

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        ratingValid.textContent = "Rating is required and must be a number between 1 and 5";
        return false;
    }
    else {
        ratingValid.textContent = "";
        return true;
    }
}

function image(upload) {
    const image = upload.files[0];
    const imageValid = document.getElementById("imageValid");

    if(image) {
        const types = ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/heif'];
        if (!types.includes(image.type)) {
            imageValid.innerText = "Invalid file type. Allowed types: JPEG, PNG, GIF, HEIC, HEIF.";
            return false;
        }
        else {
            imageValid.innerText = "";
            return true;
        }
    }
    return true;
}

export default{
    validateForm
}