console.log("🔥 BOT ARRANCÓ OK");

const RANKING_URL = "https://raw.githubusercontent.com/ttomyssj-collab/ranking/refs/heads/main/ranking.json";

async function actualizarRanking() {
  try {
    console.log("⏳ intentando actualizar ranking...");

    const res = await fetch(RANKING_URL);

    console.log("📡 status:", res.status);

    const data = await res.json();

    console.log("📊 Ranking actualizado:");
    console.log(data);

  } catch (err) {
    console.log("❌ ERROR ranking:", err.message);
  }
}

// ejecutar al inicio
actualizarRanking();

// repetir cada 60s
setInterval(actualizarRanking, 60000);

// keep alive
setInterval(() => {
  console.log("⏱️ BOT VIVO");
}, 30000);