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

// recupero punteggi e turno dai localStorage
let team1Score = Number(localStorage.getItem("team1Score") || 0);
let team2Score = Number(localStorage.getItem("team2Score") || 0);
let turno = Number(localStorage.getItem("turno") || 1); // 1 = Team1, 2 = Team2

// aggiorna visualizzazione punteggi
function aggiornaPunteggi() {
  const t1 = document.getElementById("team1");
  const t2 = document.getElementById("team2");
  if(t1 && t2) {
    t1.textContent = team1Score;
    t2.textContent = team2Score;
  }
  const team1 = document.getElementById("punti1");
  const team2 = document.getElementById("punti2");
  if(turno===1) {
    team1.className = "activeTurn";
    team2.className = "turn";
  } else {
    team1.className = "turn";
    team2.className = "activeTurn";
  }
}

// INDEX.HTML: aggiorna celle rosse al ritorno
document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    if (localStorage.getItem("cell-" + (index + 1)) === "red") {
      cell.classList.add("red");
    }
  });
  aggiornaPunteggi();
});

// INDEX.HTML: click su cella
if(document.getElementById("grid")){
  const grid = document.getElementById("grid");
  dati.categorie.forEach(cat => {
    const header = document.createElement("div");
    header.classList.add("header");
    header.textContent = cat;
    header.style.color = "white";
    grid.appendChild(header);
  });
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const index = r*5+c+1;
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = (r+1)*100;
      cell.style.color = "white";
      if(localStorage.getItem("cell-"+index)==="red"){
        cell.classList.add("red");
      }
      cell.addEventListener("click",()=>{
        localStorage.setItem("cell-"+index,"red");
        localStorage.setItem("row", r);
        localStorage.setItem("col", c);
        window.location.href = "domanda.html";
      });
      grid.appendChild(cell);
    }
  }
}

// RESET
function resetGame(){
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("red"));
  localStorage.clear();
  team1Score=0; team2Score=0; turno=1;
  aggiornaPunteggi();
}

// DOMANDA.HTML
if(document.getElementById("box")){
  const r = Number(localStorage.getItem("row"));
  const c = Number(localStorage.getItem("col"));
  //document.getElementById("titolo-domanda").textContent = dati.categorie[c];
  const domanda = dati.domande[r][c];
  const box = document.getElementById("box");

  // svuota il contenitore
  box.innerHTML = "";

  if(domanda.tipo === "testo"){
    box.textContent = domanda.contenuto;
    box.style.fontSize = "30px"
  } 
  else if(domanda.tipo === "immagine"){
    const img = new Image(); // crea l'immagine in memoria prima di appenderla
    img.src = domanda.contenuto;

    img.onload = () => {
        const boxWidth = box.clientWidth;
        const boxHeight = box.clientHeight;
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        // scala necessaria per ridurre o ingrandire senza deformare
        const widthRatio = boxWidth / width;
        const heightRatio = boxHeight / height;

        let scale;

        if (width > boxWidth || height > boxHeight) {
            // immagine più grande della box → scala verso il basso
            scale = Math.min(widthRatio, heightRatio);
        } else {
            // immagine più piccola → scala verso l'alto fino a far combaciare almeno una dimensione
            scale = Math.min(widthRatio, heightRatio);
        }

        img.style.width = width * scale + "px";
        img.style.height = height * scale + "px";

        // appendiamo l'immagine solo dopo aver calcolato la dimensione
        box.innerHTML = ""; // svuota la box prima
        box.appendChild(img);
    }
}

  else if(domanda.tipo === "audio"){
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = domanda.contenuto;
    box.appendChild(audio);
  }

  document.getElementById("btn-risposta").addEventListener("click", ()=>{
    window.location.href = `risposta.html`;
  });
}

// RISPOSTA.HTML
if(document.getElementById("testo-risposta")){
  const r = Number(localStorage.getItem("row"));
  const c = Number(localStorage.getItem("col"));
  document.getElementById("testo-risposta").textContent = dati.risposte[r][c];

  function correctAnswer() {
    let punti = (r+1)*100;
    if(turno===1) team1Score += punti;
    else team2Score += punti;
    turno = turno===1 ? 2 : 1;
    localStorage.setItem("team1Score", team1Score);
    localStorage.setItem("team2Score", team2Score);
    localStorage.setItem("turno", turno);
    window.location.href = "index.html";
  };

  function wrongAnswer() {
    let punti = (r+1)*100;
    if(turno===1) team1Score -= punti;
    else team2Score -= punti;
    turno = turno===1 ? 2 : 1;
    localStorage.setItem("team1Score", team1Score);
    localStorage.setItem("team2Score", team2Score);
    localStorage.setItem("turno", turno);
    window.location.href = "index.html";
  };

  document.body.appendChild(correctBtn);
  document.body.appendChild(wrongBtn);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker registrato"))
      .catch(err => console.error("Errore SW:", err));
  }
}