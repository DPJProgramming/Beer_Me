window.onload = async () => {
    const config = {
        method:"get",
        mode: "cors"
    }
    try {
        console.log("trying fetch request");
        const response = await fetch('/', config);
    }   
    catch (error) {
        const response = error.response;
    }    
    console.log(JSON.stringify(response));
    displayBeers(await response.json());
}

function displayBeers(beers){
    const ul = document.querySelector('.favorite-beers');
    
    beers.forEach(beer => {
        const name = beer.name;
        const image = "./img/" + `${name}`;

        const li = document.createElement("li");

        li.setAttribute("class", "beer-item");
        li.innerHTML = `<img src="${image}" alt="${name}"><span>${name}</span>`;
        ul.appendChild(li);
    })
}

