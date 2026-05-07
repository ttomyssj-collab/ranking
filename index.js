console.log("🔥 BOT ARRANCÓ OK");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const RANKING_URL = "https://raw.githubusercontent.com/ttomyssj-collab/ranking/refs/heads/main/ranking.json";

async function actualizarRanking() {
  try {
    console.log("⏳ intentando actualizar ranking...");

    const res = await fetch(RANKING_URL);

    console.log("📡 respuesta recibida:", res.status);

    const data = await res.json();

    console.log("📊 Ranking actualizado:");
    console.log(data);

  } catch (err) {
    console.log("❌ Error actualizando ranking:", err.message);
  }
}

actualizarRanking();

setInterval(actualizarRanking, 60000);

setInterval(() => {
  console.log("⏱️ BOT VIVO");
}, 30000);