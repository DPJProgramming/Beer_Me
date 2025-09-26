window.onload = async () => {
    const config = {
        method:"get",
        mode: "cors"
    }
    const response = await fetch('/beer', config);
    const beers = await response.json();
    displayBeers(beers);
}

function displayBeers(beers){
    const ul = document.getElementById('favorite-beers');
    ul.innerHTML = "";

    beers.forEach(beer => {
        //create elements
        const name = document.createElement("span");
        name.innerText = beer.name;
        name.setAttribute("id", beer.id);

        const image = document.createElement("img");
        image.src = beer.image;
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

        const form = document.createElement("form");
        form.setAttribute("id", "editBeerForm");
        form.setAttribute("action", "/editBeer");
        form.setAttribute("method", "post");
        form.setAttribute("enctype", "multipart/form-data");

        const edit = document.createElement("button");
        edit.innerText = "Edit";
        edit.setAttribute("type", "submit");
        edit.setAttribute("form", "editBeerForm");
        edit.setAttribute("value", beer.id);

        //append elements
        const li = document.createElement("li");
        li.appendChild(image);
        li.appendChild(name);
        li.appendChild(rating);
        li.appendChild(description);
        li.appendChild(brewery);
        li.appendChild(type);
        li.appendChild(location);
        li.appendChild(date);
        
        form.appendChild(edit);

        li.setAttribute("class", "beer-item");

        ul.appendChild(li);
    })
}

