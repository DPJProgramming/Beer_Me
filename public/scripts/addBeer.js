window.onload = function() {    
    const form = document.getElementById("newBeerForm");
    form.addEventListener("submit", getNewBeerInfo); 
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
