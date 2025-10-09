window.onload = async () => {
    const config = {
        method:"get",
        mode: "cors"
    }
    const response = await fetch('/topBeers', config);
    if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
    }

    const beers = await response.json();

    if (!beers || !Array.isArray(beers) || beers.length === 0) {
        noBeerAlert();
    }
    else{
        displayBeers(beers.filter((beer, i) => i < 10));

        const search = document.getElementById("search");
        search.addEventListener('input',() => searchFor(beers, search.value));
    }
    
}

function displayBeers(beers){
    const ul = document.getElementById('favorite-beers');
    ul.innerHTML = "";

    beers.forEach(beer => {
        //create elements
        const name = document.createElement("h3");
        name.innerText = beer.name;
        name.setAttribute("id", beer.id);

        const image = document.createElement("img");
        image.src = `img/${beer.image}` ;
        image.alt = beer.name;

        const rating = document.createElement("span");
        rating.innerText = `Rating: ${beer.rating}/5`;

        const description = document.createElement("p");
        description.innerText = beer.description;

        const brewery = document.createElement("span");
        brewery.innerText = `Brewery: ${beer.brewery}`;

        const type = document.createElement("span");
        type.innerText = `Type: ${beer.type}`;

        const location = document.createElement("span");
        location.innerText = `Location: ${beer.location}`;

        const date = document.createElement("span");
        date.innerText = `Added on: ${beer.date}`;

        const edit = document.createElement("a");
        edit.href = `/editBeer.html?id=${beer.id}`;
        edit.innerText = "Modify";

        //create delete form elements and handle click
        const deleteBeer = document.createElement("input");
        deleteBeer.type = "submit";
        deleteBeer.value = "Delete";
        deleteBeer.name = "delete";

        const id = document.createElement("input");
        id.type = "hidden";
        id.name = "id";
        id.value = beer.id;

        const deleteForm = document.createElement("form");
        deleteForm.appendChild(deleteBeer);
        deleteForm.appendChild(id);
        deleteForm.method = "POST";
        deleteForm.action = `/deleteBeer/${beer.id}`;

        deleteBeer.onclick = function(event) {
            event.preventDefault();
            if(confirm(`Are you sure you want to delete ${beer.name}?`)){
                deleteForm.submit();
            }
        };

        //line break
        const br = document.createElement("br");

        //append elements
        const li = document.createElement("li");
        li.appendChild(name);
        li.appendChild(rating);
        li.appendChild(image);
        li.appendChild(description);
        li.appendChild(brewery);
        li.appendChild(type);
        li.appendChild(location);
        li.appendChild(date);
        li.appendChild(edit);
        li.appendChild(deleteForm);
        li.appendChild(br);

        li.setAttribute("class", "beer-item");

        ul.appendChild(li);
    })
}

function noBeerAlert(){
    const body = document.getElementById("favorite-beers");
    const message = document.createElement("h3");
    message.innerText = "NO BEERS!!!";
    body.appendChild(message);
}

function searchFor(beers, term){
    let message = document.getElementById('searchMessage');
    const searchTerm = term.toLowerCase().trim();

    let filteredBeers = beers.filter((beer) => 
                     beer.name.toLowerCase().startsWith(searchTerm)
                  || beer.type.toLowerCase().startsWith(searchTerm)
                  || beer.brewery.toLowerCase().startsWith(searchTerm));

    if(filteredBeers.length === 0){
        message.innerText = "No results";
        document.getElementById('favorite-beers').innerHTML = "";
    }
    else{
        message.innerText = ""
        displayBeers(filteredBeers);
    }
}

