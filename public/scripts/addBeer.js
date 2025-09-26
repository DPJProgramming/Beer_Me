window.onload = function() {
    const form = document.getElementById("newBeerForm");
    
    //currently disabled as form is sent directly to backend via form action attribute
    //form.addEventListener("submit", getNewBeerInfo); 
}

function getNewBeerInfo(event){
    event.preventDefault();

    //get form info
    const newBeer = new FormData(event.target);

    //send beer to backend
    addBeer(newBeer);
}

async function addBeer(newBeer){
    //prepare beer
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