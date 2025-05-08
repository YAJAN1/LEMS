const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

const token = "YoAucXpwL-zcctPdsg9c2GO4ANoZywyv";

async function fetchData() {
  try {
    const [t1, t2, h1, h2, g1, g2] = await Promise.all([
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V0`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V3`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V1`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V4`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V2`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V5`).then(r => r.text())
    ]);

    const avgTemp = ((parseFloat(t1) + parseFloat(t2)) / 2).toFixed(2);
    const avgHum = ((parseFloat(h1) + parseFloat(h2)) / 2).toFixed(2);
    const avgAqi = Math.round((parseInt(g1) + parseInt(g2)) / 2);

    document.getElementById("temp").innerText = avgTemp + " °C";
    document.getElementById("humidity").innerText = avgHum + " %";
    document.getElementById("aqi").innerText = avgAqi;

  } catch (err) {
    console.error("Error fetching data from Blynk:", err);
    document.getElementById("temp").innerText = "Error";
    document.getElementById("humidity").innerText = "Error";
    document.getElementById("aqi").innerText = "Error";
  }
}

setInterval(fetchData, 5000); // Refresh every 5 seconds
fetchData();
