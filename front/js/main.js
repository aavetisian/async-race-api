
function fetchGarageData() {
    fetch('http://localhost:3001/garage')
        .then(response => response.json())
        .then(data => {
            const garageList = document.getElementById('garage-list');
            garageList.innerHTML = '';

            data.forEach(car => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                            <strong>Name:</strong> ${car.name}, <strong>Color:</strong> ${car.color}
                            <button onclick="startEngine(${car.id})">Start</button>
                            <button onclick="stopEngine(${car.id})">Stop</button>
                            <button onclick="driveCar(${car.id})">Drive</button>
                        `;
                garageList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching garage data:', error));
}

function startEngine(carId) {
    const url = `http://localhost:3001/engine?id=${carId}&status=started`;
    fetch(url, { method: 'PATCH' })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response (optional)
            fetchGarageData(); // Refresh the garage data after engine status update
        })
        .catch(error => console.error('Error starting engine:', error));
}

function stopEngine(carId) {
    const url = `http://localhost:3001/engine?id=${carId}&status=stopped`;
    fetch(url, { method: 'PATCH' })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response (optional)
            fetchGarageData(); // Refresh the garage data after engine status update
        })
        .catch(error => console.error('Error stopping engine:', error));
}

function driveCar(carId) {
    const url = `http://localhost:3001/engine?id=${carId}&status=drive`;
    fetch(url, { method: 'PATCH' })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response (optional)
            fetchGarageData(); // Refresh the garage data after drive action
        })
        .catch(error => console.error('Error driving the car:', error));
}

// Fetch initial data when the page loads
fetchGarageData();
console.log("worked");