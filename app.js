let chart;

const btn = document.getElementById("btnSearch");
const statusBox = document.getElementById("status");
const chartBox = document.getElementById("chartBox");

btn.addEventListener("click", async () => {
  const input = document.getElementById("cityInput").value.trim();

const parts = input.split(",");

if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
  alert("Formato inválido. Usa: 19.43,-99.13");
  return;
}

const lat = parts[0].trim();
const lon = parts[1].trim();

  
  const days = document.getElementById("daysSelect").value;

  if (!input.includes(",")) {
    alert("Ingresa lat,lon correctamente");
    return;
  }

  const [lat, lon] = input.split(",");

  statusBox.classList.remove("hidden");
  chartBox.classList.add("hidden");

  if (chart) chart.destroy();

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&forecast_days=${days}&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();

    const labels = data.daily.time;
    const temps = data.daily.temperature_2m_max;

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
          label: "Temperatura °C",
          data: temps,
          borderColor: color,
          backgroundColor: color,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000
        }
      }
    });

    statusBox.classList.add("hidden");
    chartBox.classList.remove("hidden");

  } catch (error) {
    statusBox.innerHTML = "<p>Error al cargar datos</p>";
  }
});

