window.onload = function() {
    const form = document.getElementById("newBeerForm");
    form.addEventListener("submit", getNewBeerInfo);
}

function getNewBeerInfo(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const brewery = document.getElementById("brewery").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const rating = document.getElementById("rating").value;
    const image = document.getElementById("image").value;
    const date = Date.now();

    const beer = {
        name: name,
        type: type,
        brewery: brewery,
        description: description,
        location: location,
        rating: rating,
        image: image,
        date: date
    }

    addBeer(beer);
}

function addBeer(beer){
    const config = {
        method:"post",
        mode: "cors",
        data: beer
    }
    const response = fetch('/addBeer', config, beer);

    //TO DO:
    //handle response
}