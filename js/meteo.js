let j = 0;
let heure;
function clock() {
const d = new Date();
let h = d.getHours();
let m = String(d.getMinutes()).padStart(2, '0');

heure = h + " : " + m;

let date = d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})

if(m == "00" && j == 0) {
    createFetch();
    j++;
    console.log("j =" + j);
    setTimeout(createFetch, 60000);
};

if(m == "01") {
    j--
};

document.getElementById("heure").innerHTML = heure;
document.getElementById("date").innerHTML = date;
};

function createFetch() {
    fetch('/js/conf.json')
    .then(conf => conf.json())
    .then(ville => {
        if(ville != ""){
            let city = ville.ville;
            document.getElementById("Ville").innerText = city;
            console.log(city);
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=1c7023eaed1aee741051bf97d0d2c0fe&units=metric&lang=fr')
                .then(res => res.json())
                .then(meteo => {
                    document.getElementById("temperature").innerText = Math.round(meteo.main.temp) + "°C";
                    console.log(Math.round(meteo.main.temp));
                    document.getElementById("humidite").innerText = "Humidité : " + meteo.main.humidity + "%";
                    console.log(meteo.main.humidity);
                    document.getElementById("wind").innerText = "Vent : " + Math.round(meteo.wind.speed) + " km/h";
                    console.log(meteo.wind.speed);
                    let temps = meteo.weather[0].description
                    document.getElementById("sky").innerText = temps.charAt(0).toUpperCase() + temps.slice(1);
                    console.log(meteo.weather[0].description);
                    img = document.getElementById("imgSky");
                    console.log(meteo.weather[0].id) ;
                    idImg = meteo.weather[0].id;
                    if (idImg >= 200 && idImg <= 232){
                        img.src = "https://openweathermap.org/img/wn/11d@2x.png";
                    }else if (idImg >= 300 && idImg <= 321){
                        img.src = "https://openweathermap.org/img/wn/09d@2x.png";
                    }else if (idImg >= 500 && idImg <= 531){
                        img.src = "https://openweathermap.org/img/wn/10d@2x.png";
                    }else if (idImg >= 600 && idImg <= 622){
                        img.src = "https://openweathermap.org/img/wn/13d@2x.png";
                    }else if (idImg >= 700 && idImg <= 781){
                        img.src = "https://openweathermap.org/img/wn/50d@2x.png";
                    }else if (idImg == 800){
                        img.src = "https://openweathermap.org/img/wn/01d@2x.png";
                    }else if (idImg >= 801 && idImg <= 804){
                        img.src = "https://openweathermap.org/img/wn/03d@2x.png";
                    };
                    console.log(img.src);
                    console.log(meteo)
        })
    }
})
};

function hover(element){
    element.setAttribute('src', '/icones/Fleche-hover.png');
}

function unhover(element){
    element.setAttribute('src', '/icones/Fleche.png');
}

clock();
createFetch();
setInterval(clock, 1000);
