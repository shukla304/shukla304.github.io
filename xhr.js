const getBtn = document.getElementById('submitreq');
const FtoFBtn = document.getElementById('converttof');
const CtoFBtn = document.getElementById("converttoc")
const city = document.getElementById('city').value;
const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const getData = () => {
    const city = document.getElementById('city').value;
    sendHttpRequest('GET', 'http://api.weatherstack.com/current?access_key=e5436e56f7e24452061def305681724c&query=' + city + '&units=m').then(responseData => {
        
        // Response Code Data 

        document.getElementById("search-result").innerHTML = "Search Results:";
        document.getElementById("search-result").style.display = "block";
        document.getElementById("name").innerHTML = responseData.location.name;
        document.getElementById("temp").innerHTML = responseData.current.temperature + ' C';
        document.getElementById("tempimage").src = responseData.current.weather_icons[0];
        document.getElementById("tempimage").style.display = "block";
        document.getElementById("converttof").style.display = "block";
        document.getElementById("wdisc").innerHTML = responseData.current.weather_descriptions[0];

        // Local Session Storage for City 
        const keys = getkeys();
        keys.push(responseData.location.name);
        localStorage.setItem('keys', JSON.stringify(keys));
        console.log(JSON.stringify(localStorage.getItem('keys')));
        const stringd = localStorage.getItem('keys')
        const arr = JSON.parse("[" + stringd + "]");
        const hisarr = ["his1", "his2", "his3"];
        console.log(hisarr);
        console.log(arr);

        // Local Session Storage for Temp
        const tempkeys = getTempKeys();
        tempkeys.push(responseData.current.temperature);
        localStorage.setItem('tempkeys', JSON.stringify(tempkeys));
        console.log(JSON.stringify(localStorage.getItem('tempkeys')));
        const tempkeyd = localStorage.getItem('tempkeys')
        const arrtempkey = JSON.parse("[" + tempkeyd + "]");
        console.log(arrtempkey);

        // Priting the Recent History Data

        for (i = arr[0].length, j = arrtempkey[0].length; i >= arr[0].length; i--) {
            document.getElementById("his1").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| C';
            document.getElementById("his2").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| C';
            document.getElementById("his3").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| C';
            document.getElementById("his4").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| C';
            break;
        }

    });
};


//////////////////////

const fehData = () => {
    const city = document.getElementById('city').value;
    sendHttpRequest('GET', 'http://api.weatherstack.com/current?access_key=e5436e56f7e24452061def305681724c&query=' + city + '&units=f').then(responseData => {
        
        // Response Code Data 

        document.getElementById("search-result").innerHTML = "Search Results:";
        document.getElementById("search-result").style.display = "block";
        document.getElementById("name").innerHTML = responseData.location.name;
        document.getElementById("temp").innerHTML = responseData.current.temperature + ' F';
        document.getElementById("tempimage").src = responseData.current.weather_icons[0];
        document.getElementById("tempimage").style.display = "block";
        document.getElementById("converttoc").style.display = "block";
        document.getElementById("wdisc").innerHTML = responseData.current.weather_descriptions[0];

        // Local Session Storage for City 
        const keys = getkeys();
        keys.push(responseData.location.name);
        localStorage.setItem('keys', JSON.stringify(keys));
        console.log(JSON.stringify(localStorage.getItem('keys')));
        const stringd = localStorage.getItem('keys')
        const arr = JSON.parse("[" + stringd + "]");
        const hisarr = ["his1", "his2", "his3"];
        console.log(hisarr);
        console.log(arr);

        // Local Session Storage for Temp
        const tempkeys = getTempKeys();
        tempkeys.push(responseData.current.temperature);
        localStorage.setItem('tempkeys', JSON.stringify(tempkeys));
        console.log(JSON.stringify(localStorage.getItem('tempkeys')));
        const tempkeyd = localStorage.getItem('tempkeys')
        const arrtempkey = JSON.parse("[" + tempkeyd + "]");
        console.log(arrtempkey);

        // Priting the Recent History Data

        for (i = arr[0].length, j = arrtempkey[0].length; i >= arr[0].length; i--) {
            document.getElementById("his1").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| F';
            document.getElementById("his2").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| F';
            document.getElementById("his3").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| F';
            document.getElementById("his4").innerHTML = arr[0][--i] + ' ' + arrtempkey[0][--j] + '| F';
            break;
        }

    });
};

///////////////////////







// To Get Temperature Values
function getTempKeys() {
    let tempkeys;
    if (localStorage.getItem('tempkeys') === null) {
        tempkeys = [];
    } else {
        tempkeys = JSON.parse(localStorage.getItem('tempkeys'));
    }

    return tempkeys;
}

// To Get City Values 
function getkeys() {
    let keys;
    if (localStorage.getItem('keys') === null) {
        keys = [];
    } else {
        keys = JSON.parse(localStorage.getItem('keys'));
    }

    return keys;
}


getBtn.addEventListener('click', getData);
FtoFBtn.addEventListener('click', fehData);
CtoFBtn.addEventListener('click', getData);