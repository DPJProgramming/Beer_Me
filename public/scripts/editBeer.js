window.onload = async () => {
    
    //get beer id from url
    const urlParams = new URLSearchParams(window.location.search);
    const beerId = urlParams.get('id');

    //prepare form submission handler
    const editForm = document.getElementById('editBeerForm');
    editForm.addEventListener('submit', validate);

    //fill initial form data
    fillFormData(beerId);    
}

async function fillFormData(beerId) {
    if (!beerId) {
        alert('Error: Can\'t find beer');
        window.location.href = './index.html';
        return;
    }

    try {
        // Fetch beer data from backend
        const response = await fetch(`/getBeer/${beerId}`);
        
        if (!response.ok) {
            throw new Error('Beer not found');
        }
        
        const beer = await response.json();
        
        // Populate form fields with existing data
        document.getElementById('beerId').value = beer.id || '';
        document.getElementById('name').value = beer.name || '';
        document.getElementById('type').value = beer.type || '';
        document.getElementById('brewery').value = beer.brewery || '';
        document.getElementById('description').value = beer.description || '';
        document.getElementById('location').value = beer.location || '';
        document.getElementById('rating').value = beer.rating || '';
        document.getElementById('currentImage').src = `img/${beer.image}` || 'img/placeholder.png';
        document.getElementById('date').innerHTML = beer.date || '';

        document.getElementById('submit').value = 'Update Beer';
        
    } catch (error) {
        console.error('Error pouring beer:', error);
        alert('Couldn\'t pour this beer');
        window.location.href = './index.html';
    }
};

function validate(event){
    event.preventDefault();
    const isValid = areFieldsValid();

    if(!isValid){
        return;
    }
    else{
        submitEditBeer(event);
    }
}

function areFieldsValid(){
    let valid = true;
    
    valid = validateName() && valid;
    valid = validateType() && valid;
    valid = validateRating() && valid;

    return valid;
}

async function submitEditBeer(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const beer = {
        method: "POST",
        mode: "cors",
        body: formData
    }

    const result = await fetch('/editBeer', beer);

    //TO DO: handle response properly
    console.log(result);

    if(result.ok){
        alert('Beer updated successfully');
        window.location.href = 'index.html';
    }
}

function validateName() {
    const name = document.getElementById("name").value;
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

function validateType() {
    const type = document.getElementById("type").value;
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

function validateRating() {
    console.log("Validating rating");
    const rating = document.getElementById("rating").value;
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

function validateImage() {
    const upload = document.getElementById("upload");
    const image = upload.files[0];
    const imageValid = document.getElementById("imageValid");

    if (image) {
        const types = ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/heif'];
        if (!types.includes(image.type)) {
            imageValid.innerText = "Invalid image type. Allowed types: JPEG, PNG, GIF, HEIC, HEIF.";
            return false;
        }
        else {
            imageValid.innerText = "";
            return true;
        }
    }
    return true;
}
