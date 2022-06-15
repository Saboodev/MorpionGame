const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');

let verrouillage = true;
let joueurEnCours = "X";

const replay = document.querySelector(".button");

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let partieEnCours = ["","","","","","","","",""];

cellules.forEach(cell => {
    cell.addEventListener('click', clicSurCase);
})

function clicSurCase(e){
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute('data-index');

    if(partieEnCours[caseIndex] !== "" || !verrouillage){
        return;
    }

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partieEnCours)

    validationResultats();

}

function validationResultats(){

    let finDePartie = false;

    for(let i = 0; i < alignementsGagnants.length; i++ ){

        const checkWin = alignementsGagnants[i];
        //  [0, 1, 2],
        let a = partieEnCours[checkWin[0]];
        let b = partieEnCours[checkWin[1]];
        let c = partieEnCours[checkWin[2]];

        if(a === '' || b === '' || c === ''){
            continue;
        }
        if( a === b && b === c){
            finDePartie = true;
            break;
        }
    }

    if(finDePartie){
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`
        verrouillage = false;
        //Rend visible le bouton rejouer
        replay.style.visibility = "visible";
        replay.onclick = function() {
        location.reload();
        }
        // animation confettis
        const start = () => {
            setTimeout(function() {
                confetti.start()
            }, 1000); // 1000 = 1 seconde pour démarrer les confettis
        };
        const stop = () => {
            setTimeout(function() {
                confetti.stop()
            }, 5000); // 5000 = 5 secondes pour stopper les confettis
        };
        start();
        stop();
        return;
    }

    // si il n'y pas de chaine de caracteres vides dans partie en cours
    let matchNul = !partieEnCours.includes('');
    if(matchNul){
        info.innerText =  'Partie terminée, match nul !';
        verrouillage = false;
        //Rend visible le bouton rejouer
        replay.style.visibility = "visible";
        replay.onclick = function() {
        location.reload();
        }
        return;
    }

    changementDeJoueur();
}


function changementDeJoueur(){
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerText = `Au tour de ${joueurEnCours}`;
}