let chart;

const btn = document.getElementById("btnSearch");
const statusBox = document.getElementById("status");
const chartBox = document.getElementById("chartBox");

btn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const days = document.getElementById("daysSelect").value;

  if (!city) {
    alert("Escribe una ciudad o país");
    return;
  }

  statusBox.classList.remove("hidden");
  chartBox.classList.add("hidden");

  if (chart) chart.destroy();

  try {
    // 1️⃣ Geocoding (ciudad → lat/lon)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("Ciudad no encontrada");
      statusBox.classList.add("hidden");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Clima
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&forecast_days=${days}&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    const labels = weatherData.daily.time;
    const temps = weatherData.daily.temperature_2m_max;

    const maxTemp = Math.max(...temps);
    let color = "#333";
    if (maxTemp > 30) color = "red";
    if (maxTemp < 10) color = "blue";

    const ctx = document.getElementById("weatherChart");

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `Temperatura en ${name}, ${country} (°C)`,
          data: temps,
          borderColor: color,
          backgroundColor: color,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1000 }
      }
    });

    statusBox.classList.add("hidden");
    chartBox.classList.remove("hidden");

  } catch (error) {
    statusBox.innerHTML = "<p>Error al cargar datos</p>";
  }
});

