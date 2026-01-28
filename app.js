<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Clima Web – Neumorphism</title>

  <!-- Estilos -->
  <link rel="stylesheet" href="style.css">

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

<header class="header">
  <h1>El Clima a tu Alcance</h1>
</header>

<section class="search-box">
  <input type="text" id="cityInput" placeholder="Ciudad o lat,lon (ej: 19.43,-99.13)">
  <button id="btnSearch">Buscar</button>
</section>

<section class="controls">
  <label>Fecha inicio:</label>
  <input type="date" id="dateInput">

  <label>Días:</label>
  <select id="daysSelect">
    <option value="5">5 días</option>
    <option value="10">10 días</option>
  </select>
</section>

<section id="status" class="status hidden">
  <div class="spinner"></div>
  <p>Cargando datos...</p>
</section>

<section class="chart-container hidden" id="chartBox">
  <canvas id="weatherChart"></canvas>
  <div id="legend" class="dynamic-legend"></div>
</section>

<script>
  document.getElementById("dateInput").value =
    new Date().toISOString().split("T")[0];
</script>

<script src="app.js"></script>
</body>
</html>
