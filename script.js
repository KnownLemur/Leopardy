// Recupera parametri da URL
function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

const dati = {
      categorie: ["MUSICA", "ATLETI", "ARTE", "FILM", "MATEMATICA"],
        domande: [
        // RIGA 1 → 100
        [
          { tipo: "audio", contenuto: "domande/Musica100.mp3" },
          { tipo: "immagine", contenuto: "domande/Atleti100.jpg" },
          { tipo: "immagine", contenuto: "domande/Arte100.jpg" },
          { tipo: "immagine", contenuto: "domande/Film100.jpg" },
          { tipo: "testo", contenuto: "🍎 + 🍌 = 10\n🍌 + 2 = 4\n🍎 + 🍎 = ?" }
        ],
        // RIGA 2 → 200
        [
          { tipo: "audio", contenuto: "domande/Musica200.mp3" },
          { tipo: "immagine", contenuto: "domande/Atleti200.jpg" },
          { tipo: "immagine", contenuto: "domande/Arte200.jpg" },
          { tipo: "immagine", contenuto: "domande/Film200.jpg" },
          { tipo: "testo", contenuto: "Quali sono i fattori primi di:\n105" }
        ],
        // RIGA 3 → 300
        [
          { tipo: "audio", contenuto: "domande/Musica300.mp3" },
          { tipo: "immagine", contenuto: "domande/Atleti300.jpg" },
          { tipo: "immagine", contenuto: "domande/Arte300.jpg" },
          { tipo: "immagine", contenuto: "domande/Film300.jpg" },
          { tipo: "immagine", contenuto: "domande/Matematica300.jpg" }
        ],
        // RIGA 4 → 400
        [
          { tipo: "audio", contenuto: "domande/Musica400.mp3" },
          { tipo: "immagine", contenuto: "domande/Atleti400.jpg" },
          { tipo: "immagine", contenuto: "domande/Arte400.jpg" },
          { tipo: "immagine", contenuto: "domande/Film400.jpg" },
          { tipo: "testo", contenuto: "Un triangolo rettangolo ha gli\nangoli di 30, 60 e 90 gradi,\nil cateto minore misura 21cm.\nQuanto misura l'ipotenusa?" }
        ],
        // RIGA 5 → 500
        [
          { tipo: "audio", contenuto: "domande/Musica500.mp3" },
          { tipo: "immagine", contenuto: "domande/Atleti500.jpg" },
          { tipo: "immagine", contenuto: "domande/Arte500.jpg" },
          { tipo: "immagine", contenuto: "domande/Film500.jpg" },
          { tipo: "immagine", contenuto: "domande/Matematica500.jpg" }
        ]
      ],
      risposte: [
        ["Inno di Mameli", "Jannik Sinner", "Duomo di Firenze \n/\n Santa Maria del Fiore", "Avengers: Age of Ultron", "16"],
        ["Notte Prima degli Esami\nAntonello Venditti", "Charles Leclerc", "Tower Bridge", "The Wolf of Wall Street", "3; 5; 7"],
        ["Poesia Senza Veli \nUltimo", "Paola Egonu", "Paolina Borghese \ndi Antonio Canova", "Mad MAx: Fury Road", "2"],
        ["Video Killed the Radio Star \nThe Buggles", "Marco Belinelli", "Il Tradimento delle Immagini \nRené Magritte", "The Terminal", "42"],
        ["Your Song \nElton John", "Carolina Kostner", "Hagia Sofia", "Hugo", "3"]
      ]
    };
// --- Funzioni di gestione punteggi ---
let team1Score = 0;
let team2Score = 0;
let turno = 1;

function caricaPunteggi() {
  team1Score = Number(localStorage.getItem("team1Score") || 0);
  team2Score = Number(localStorage.getItem("team2Score") || 0);
  turno = Number(localStorage.getItem("turno") || 1);
}

function aggiornaPunteggi() {
  const t1 = document.getElementById("team1");
  const t2 = document.getElementById("team2");
  if(t1 && t2){
    t1.textContent = team1Score;
    t2.textContent = team2Score;
  }

  const team1 = document.getElementById("punti1");
  const team2 = document.getElementById("punti2");
  if(team1 && team2){
    if(turno===1){
      team1.className = "activeTurn";
      team2.className = "turn";
    } else {
      team1.className = "turn";
      team2.className = "activeTurn";
    }
  }
}

// --- Reset del gioco ---
function resetGame(){
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("red"));
  localStorage.clear();
  caricaPunteggi();
  aggiornaPunteggi();
}

// --- INDEX.HTML ---
document.addEventListener("DOMContentLoaded", () => {
  caricaPunteggi();

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    if(localStorage.getItem("cell-"+(index+1))==="red"){
      cell.classList.add("red");
    }
  });
  aggiornaPunteggi();

  const grid = document.getElementById("grid");
  if(grid){
    dati.categorie.forEach(cat => {
      const header = document.createElement("div");
      header.classList.add("header");
      header.textContent = cat;
      header.style.color = "white";
      grid.appendChild(header);
    });

    for(let r=0; r<5; r++){
      for(let c=0; c<5; c++){
        const index = r*5 + c + 1;
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = (r+1)*100;
        cell.style.color = "white";

        if(localStorage.getItem("cell-"+index)==="red") cell.classList.add("red");

        cell.addEventListener("click", ()=>{
          localStorage.setItem("cell-"+index,"red");
          localStorage.setItem("row", r);
          localStorage.setItem("col", c);
          window.location.href = "domanda.html";
        });

        grid.appendChild(cell);
      }
    }
  }
});

// --- DOMANDA.HTML ---
if(document.getElementById("box")){
  const r = Number(localStorage.getItem("row"));
  const c = Number(localStorage.getItem("col"));
  const domanda = dati.domande[r][c];
  const box = document.getElementById("box");
  box.innerHTML = "";

  if(domanda.tipo==="testo"){
    box.textContent = domanda.contenuto;
    box.style.fontSize = "30px";
  } else if(domanda.tipo==="immagine"){
    const img = new Image();
    img.src = domanda.contenuto;
    img.onload = ()=>{
      const boxWidth = box.clientWidth;
      const boxHeight = box.clientHeight;
      const widthRatio = boxWidth / img.naturalWidth;
      const heightRatio = boxHeight / img.naturalHeight;
      const scale = Math.min(widthRatio, heightRatio);
      img.style.width = img.naturalWidth * scale + "px";
      img.style.height = img.naturalHeight * scale + "px";
      box.innerHTML = "";
      box.appendChild(img);
    }
  } else if(domanda.tipo==="audio"){
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = domanda.contenuto;
    box.appendChild(audio);
  }

  const btnRisposta = document.getElementById("btn-risposta");
  if(btnRisposta){
    btnRisposta.addEventListener("click", ()=>{
      window.location.href = "risposta.html";
    });
  }
}

// --- RISPOSTA.HTML ---
if(document.getElementById("testo-risposta")){
  caricaPunteggi();
  const r = Number(localStorage.getItem("row"));
  const c = Number(localStorage.getItem("col"));

  document.getElementById("testo-risposta").textContent = dati.risposte[r][c];

  const correctBtn = document.getElementById("btn-correct");
  const wrongBtn = document.getElementById("btn-wrong");

  function correctAnswer(){
    const punti = (r+1)*100;
    if(turno===1) team1Score += punti;
    else team2Score += punti;
    turno = turno===1 ? 2 : 1;

    localStorage.setItem("team1Score", team1Score);
    localStorage.setItem("team2Score", team2Score);
    localStorage.setItem("turno", turno);

    window.location.href = "index.html";
  }

  function wrongAnswer(){
    const punti = (r+1)*100;
    if(turno===1) team1Score -= punti;
    else team2Score -= punti;
    turno = turno===1 ? 2 : 1;

    localStorage.setItem("team1Score", team1Score);
    localStorage.setItem("team2Score", team2Score);
    localStorage.setItem("turno", turno);

    window.location.href = "index.html";
  }

  correctBtn.addEventListener("click", correctAnswer);
  wrongBtn.addEventListener("click", wrongAnswer);
}

// --- Service Worker ---
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(()=>console.log("Service Worker registrato"))
    .catch(err=>console.error("Errore SW:", err));
}