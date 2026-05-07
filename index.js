const puppeteer = require("puppeteer");
const fs = require("fs");

async function getRanking() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://botrix.live/k/valvall11/leaderboard", {
    waitUntil: "networkidle2"
  });

  const users = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("table tbody tr"))
      .map(row => {
        const cols = row.querySelectorAll("td");
        return {
          user: cols[1]?.innerText.trim(),
          points: cols[2]?.innerText.trim()
        };
      });
  });

  const result = users.slice(0, 10).map(u => ({
    user: u.user,
    points: u.points
  }));

  fs.writeFileSync("ranking.json", JSON.stringify(result, null, 2));

  await browser.close();
  console.log("✅ ranking actualizado");
}

setInterval(getRanking, 20000);
getRanking();