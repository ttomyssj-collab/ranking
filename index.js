console.log("🔥 BOT PRO ARRANCADO");

// =====================
// 1. KEEP ALIVE SERVER
// =====================
const http = require("http");

http.createServer((req, res) => {
  res.write("bot alive");
  res.end();
}).listen(process.env.PORT || 3000, () => {
  console.log("🌐 Keep-alive server activo");
});

// =====================
// 2. CONFIG
// =====================
const RANKING_URL =
  "https://raw.githubusercontent.com/ttomyssj-collab/ranking/refs/heads/main/ranking.json";

// =====================
// 3. FUNCION SEGURA
// =====================
async function actualizarRanking() {
  try {
    console.log("⏳ leyendo ranking...");

    const res = await fetch(RANKING_URL);

    if (!res.ok) {
      console.log("❌ HTTP ERROR:", res.status);
      return;
    }

    const data = await res.json();

    console.log("📊 Ranking actualizado:");
    console.log(data);

  } catch (err) {
    console.log("❌ ERROR controlado:", err.message);
  }
}

// =====================
// 4. LOOP ESTABLE
// =====================
function startLoop() {
  actualizarRanking().catch(() => {});

  setInterval(() => {
    actualizarRanking().catch(err =>
      console.log("❌ loop error evitado:", err.message)
    );
  }, 60000);
}

// =====================
// 5. KEEP ALIVE LOG
// =====================
setInterval(() => {
  console.log("⏱️ BOT VIVO");
}, 30000);

// START
startLoop();