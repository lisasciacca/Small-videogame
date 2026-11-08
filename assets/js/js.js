function startLev1() {
    console.log("[NAV] Pulsante start cliccato, reindirizzamento a lev1.html");
    window.location.href = "lev1.html";
}

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector(".start");
    if (startButton) {
        startButton.addEventListener("click", startLev1);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const mario = document.querySelector(".mario");
    const mainContainer = document.querySelector("main");
    
    let marioX = 150; 
    let marioY = 112; 
    const velocita = 30; 

    let staSaltando = false;
    const tastiPremuti = {};

    window.addEventListener("keydown", (event) => {
        tastiPremuti[event.key] = true;
        gestisciMovimento();
    });

    window.addEventListener("keyup", (event) => {
        tastiPremuti[event.key] = false;
    });

    function gestisciMovimento() {
        // Se sta già saltando, blocchiamo l'esecuzione
        if (staSaltando) return; 

        // Controllo combinazione: FRECCIA SU + FRECCIA DESTRA (Salto in diagonale in avanti)
        if (tastiPremuti["ArrowUp"] && tastiPremuti["ArrowRight"]) {
            staSaltando = true; 
            mario.style.transform = "scaleX(1)";

            // FASE 1: Salita in diagonale in avanti
            marioY += 120; 
            marioX += 60;  
            if (marioX > 2900) marioX = 2900;

            mario.style.bottom = marioY + "px";
            mario.style.left = marioX + "px";
            aggiornaTelecamera();

            // FASE 2: Discesa in diagonale in avanti
            setTimeout(() => {
                marioY = 112; 
                marioX += 60; 
                if (marioX > 2900) marioX = 2900;

                mario.style.bottom = marioY + "px";
                mario.style.left = marioX + "px";
                aggiornaTelecamera();

                setTimeout(() => {
                    staSaltando = false;
                }, 150);
            }, 150);

            tastiPremuti["ArrowUp"] = false; 
        }
        // Controllo combinazione: FRECCIA SU + FRECCIA SINISTRA (Salto in diagonale all'indietro)
        else if (tastiPremuti["ArrowUp"] && tastiPremuti["ArrowLeft"]) {
            staSaltando = true; 
            mario.style.transform = "scaleX(-1)";

            // FASE 1: Salita in diagonale all'indietro
            marioY += 120; 
            marioX -= 60;  
            if (marioX < 0) marioX = 0; 

            mario.style.bottom = marioY + "px";
            mario.style.left = marioX + "px";
            aggiornaTelecamera();

            // FASE 2: Discesa in diagonale all'indietro
            setTimeout(() => {
                marioY = 112; 
                marioX -= 60; 
                if (marioX < 0) marioX = 0;

                mario.style.bottom = marioY + "px";
                mario.style.left = marioX + "px";
                aggiornaTelecamera();

                setTimeout(() => {
                    staSaltando = false;
                }, 150);
            }, 150);

            tastiPremuti["ArrowUp"] = false; 
        }
        // Movimento normale a Destra
        else if (tastiPremuti["ArrowRight"]) {
            marioX += velocita;
            if (marioX > 2900) marioX = 2900; // Limite bordo destro livello
            mario.style.transform = "scaleX(1)";
            aggiornaPosizioneENormalizza();
        } 
        // Movimento normale a Sinistra
        else if (tastiPremuti["ArrowLeft"]) {
            marioX -= velocita;
            if (marioX < 0) marioX = 0; // Limite bordo sinistro livello
            mario.style.transform = "scaleX(-1)";
            aggiornaPosizioneENormalizza();
        }
    }

    function aggiornaPosizioneENormalizza() {
        mario.style.left = marioX + "px";
        mario.style.bottom = marioY + "px";
        aggiornaTelecamera();
    }

    function aggiornaTelecamera() {
        const larghezzaLivello = 3000;
        const metaFinestra = window.innerWidth / 2;
        const maxScroll = larghezzaLivello - window.innerWidth;

        // Calcola la posizione ideale centrata su Mario
        let targetScroll = marioX - metaFinestra;

        // Clamp rigido: impedisce alla telecamera di superare i bordi del livello
        if (targetScroll < 0) {
            targetScroll = 0;
        } else if (targetScroll > maxScroll) {
            targetScroll = maxScroll;
        }

        // Applica lo scroll al contenitore principale
        mainContainer.scrollLeft = targetScroll;
    }
});