$(document).ready(function () {
  let score = 0;
  let timer = 20;
  let indexOfCurrentMole;
  let isThereAMoleDisplayed;

  let moleDisplayStatusInterval;

  function gameStart() {
    score = 0;
    timer = 20;

    $("#score").text(score);

    $(".imgMole").click(onMoleClick);

    displayMole();

    var checkMoleDisplayedInterval = setInterval(function () {
      if (!isThereAMoleDisplayed) {
        displayMole();
      }
    }, 100);

    var timerInterval = setInterval(function () {
      timer--;
      $("#timer").text(timer);
      if (timer <= 0) {
        $(".imgMole").eq(indexOfCurrentMole).hide(0);
        $(".imgHole").eq(indexOfCurrentMole).show(0);
        clearInterval(checkMoleDisplayedInterval);
        clearInterval(timerInterval);
        alert("Fin du jeu, vous avez " + score + " points");
      }
    }, 1500);
  }

  function displayMole() {
    // Récupère nombre aléatoire entre 0 et 8
    let randomIndex = Math.floor(Math.random() * 8);

    while (indexOfCurrentMole === randomIndex) {
      randomIndex = Math.floor(Math.random() * 8);
    }
    indexOfCurrentMole = randomIndex;

    $(".imgMole").eq(indexOfCurrentMole).show();
    $(".imgHole").eq(indexOfCurrentMole).hide();
    isThereAMoleDisplayed = true;

    moleDisplayStatusInterval = setInterval(function () {
      // Sélectionne tous les éléments avec la classe CSS "imgMole" (qui représentent les images des taupes), puis cache l'image correspondant à l'index indexOfCurrentMole.
      $(".imgMole").eq(indexOfCurrentMole).hide(0);
      $(".imgHole").eq(indexOfCurrentMole).show(0);

      isThereAMoleDisplayed = false;

      //   ce qui empêchera la fonction de s'exécuter à nouveau dans 700 millisecondes.
      clearInterval(moleDisplayStatusInterval);
      //   La fonction passée en argument à setInterval() sera exécutée toutes les 700 millisecondes jusqu'à ce que l'intervalle soit annulé.
    }, 900);
  }

  function onMoleClick() {
    clearInterval(moleDisplayStatusInterval);
    updateGameScore();
    if (timer > 0) {
      createNewMole();
    }
  }

  function createNewMole() {
    $(".imgMole").eq(indexOfCurrentMole).hide();
    $(".imgHole").eq(indexOfCurrentMole).show();
    displayMole(indexOfCurrentMole);
  }

  function updateGameScore() {
    score++;
    $("#score").text(score);
  }

  $("#btnStart").click(gameStart);
});
