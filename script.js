const apiKey = '24ad9e8e90e09e00659e7d5290429afd';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Sélection des éléments HTML correspondant à la zone de saisie, au bouton de recherche et à l'icône météo
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
// const weatherIcon = document.querySelector('.weather-icon')

// Définition d'une fonction asynchrone pour vérifier la météo d'une ville donnée
async function checkWeather(city){
    // Envoi d'une requête HTTP à l'API avec le nom de la ville et la clé d'API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    // Si le statut de la réponse est 404, cela signifie que la ville n'a pas été trouvée
    if (response.status == 404) {
        // Affichage d'un message d'erreur et masquage de la section météo
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    } else{
        // Sinon, conversion de la réponse en objet JSON
        const data = await response.json();
        
        // console.log(data);
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) +'°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity +'%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
        document.querySelector('.weather').style.display = 'block'
        document.querySelector('.error').style.display = 'none'

        //Code pour chosir l'image selon le temps qu'il fait
        // Ce code est commenté car il n'est pas utilisé dans ce script
        // Il sert à changer la source de l'icône météo en fonction de la valeur de data.weather[0].main
        // if (data.weather[0].main=='Clouds') {
        //     weatherIcon.src = 'images/clouds.png';
        // }else if (data.weather[0].main=='Clear') {
        //     weatherIcon.src = 'images/clear.png';
        // }else if (data.weather[0].main=='Rain') {
        //     weatherIcon.src = 'images/rain.png';
        // }else if (data.weather[0].main=='Drizzle') {
        //     weatherIcon.src = 'images/drizzle.png';
        // }else if (data.weather[0].main=='Mist') {
        //     weatherIcon.src = 'images/mist.png';
        // }
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value)
})
