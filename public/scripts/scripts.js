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
        const name = beer.name;
        const image = "./img/" + `${name}`;

        const li = document.createElement("li");

        li.setAttribute("class", "beer-item");
        li.innerHTML = `<img src="${image}" alt="${name}"><span>${name}</span>`;
        ul.appendChild(li);
    })
}

