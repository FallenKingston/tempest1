document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search-input");
    const button = document.getElementById("search-button");
    const card = document.querySelector(".card");

    button.addEventListener("click", async () => {
        const city = input.value.trim();
        if (city === "") return;

        try {
            const response = await fetch(`/weather?city=${city}`);
            const data = await response.json();

            if (data.cod && data.cod !== 200) {
                alert("Ciudad no encontrada");
                return;
            }

            // Insertar datos en la tarjeta con negritas para los títulos
            card.innerHTML = `
                <h2>${data.name}</h2>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Icono del clima">
                <p><strong>El clima de hoy es:</strong> ${data.weather[0].description}</p>
                <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
                <p><strong>Sensación térmica:</strong> ${data.main.feels_like}°C</p>
                <p><strong>Presión:</strong> ${data.main.pressure} hPa</p>
                <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Nubosidad:</strong> ${data.clouds.all}%</p>
                <p><strong>Visibilidad:</strong> ${data.visibility / 1000} km</p>
            `;

            card.style.display = "block";
        } catch (error) {
            console.error("Error al obtener datos del clima", error);
        }
    });
});
