$(document).ready(function () {
  let score = 0;
  let scores = [];
  let timer;
  let indexOfCurrentMole;
  let isThereAMoleDisplayed;
  let timerInterval;
  let moleDisplayStatusInterval;
  let checkMoleDisplayedInterval;
  let username;
  $(".imgMole").click(onMoleClick);
  let table = "<table><tr><th>Pseudo</th><th>score</th></tr></table>";
  $(table).appendTo("#tableDashboard");

  function displayUsername() {
    username = $("#username").val();
    $("#username").text("#name");
    $("#name").text(username);
    $("#home").hide();
    $("#displayUsername").show();
  }

  function gameStart() {
    score = 0;
    timer = 5;

    $("#score").text(score);

    displayMole();

    checkMoleDisplayedInterval = setInterval(function () {
      if (!isThereAMoleDisplayed) {
        displayMole();
      }
    }, 100);

    document.getElementById("btnStart").style.display = "none";

    timerInterval = setInterval(function () {
      timer--;
      $("#timer").text(timer);
      if (timer <= 0) {
        $(".imgMole").eq(indexOfCurrentMole).hide(0);
        $(".imgHole").eq(indexOfCurrentMole).show(0);
        $("#btnStart").show(0);
        clearInterval(checkMoleDisplayedInterval);
        clearInterval(timerInterval);
        scores.push(score);
        alert("Fin du jeu, vous avez " + score + " points");
        $("tbody").append("<tr><td>" + username + "</td><td>" + score + "</td></tr>");
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
    }, 1000);
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

  function refreshGameParty() {
    score = 0;
    timer = 30;

    $("#score").text(score);
    $("#timer").text(timer);
    clearInterval(timerInterval);
    $(".imgMole").hide(0);
    $(".imgHole").show(0);
    clearInterval(checkMoleDisplayedInterval);
    $("#btnStart").show(0);
    $("#home").show(0);
    $("#displayUsername").hide();
    // $("#table").hide();
  }

  $("#btnStart").click(gameStart);
  $("#btnRefresh").click(refreshGameParty);
  $("#btnValidate").click(displayUsername);
});
