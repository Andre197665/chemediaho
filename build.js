const fs   = require("fs");
const path = require("path");

const src  = path.join(__dirname, "app.js");
const code = fs.readFileSync(src, "utf8");

const workerBase = (process.env.WORKER_BASE || "").trim().replace(/\/+$/, "");

if (!workerBase) {
  // Non blocca il deploy: l'app viene pubblicata e mostra un avviso al login
  // finché WORKER_BASE non viene impostata nelle variabili d'ambiente.
  console.warn("ATTENZIONE: WORKER_BASE non impostata — il login resterà disabilitato finché non viene configurata.");
  process.exit(0);
}

if (!code.includes("__WORKER_BASE__")) {
  console.warn("placeholder __WORKER_BASE__ non trovato in app.js (già sostituito?), nessuna modifica");
  process.exit(0);
}

fs.writeFileSync(src, code.replaceAll("__WORKER_BASE__", workerBase));
console.log(`WORKER_BASE impostata ${workerBase}`);
