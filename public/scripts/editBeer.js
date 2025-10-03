window.onload = async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const beerId = urlParams.get('id');
    fillFormData(beerId);

    //currently unused as form is sent directly to backend via form action attribute
    // const editForm = document.getElementById('editBeerForm');
    // editForm.addEventListener('submit', submitEditBeer);
}

async function fillFormData(beerId) {
    if (!beerId) {
        alert('No beer ID provided');
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

//currently unused as form is sent directly to backend via form action attribute
async function submitEditBeer(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const beer = 
    {   
        id : document.getElementById('beerId').value,
        name : document.getElementById('name').value,
        type : document.getElementById('type').value,
        brewery : document.getElementById('brewery').value,
        description : document.getElementById('description').value,
        location : document.getElementById('location').value,
        rating : document.getElementById('rating').value,
        image : image
    }

    const result = await fetch('/editBeer', beerId);
};
