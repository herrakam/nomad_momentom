const API_KEY = "98e4a449fe80927d501048dfa7960198";

const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`);

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longtitude;
    const coordsObj = {
        latitude:latitude,
        longtitude:longtitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longtitude)
}

function handleGeoError(){
    console.log("can`t access geo location");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords.latitude, parseCoords.longtitude);
        getWeather(parseCoords.latitude, parseCoords.longtitude);
    }
}


function init(){
loadCoords();
}

init();