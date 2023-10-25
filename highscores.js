const highScores = document.getElementById("hsList");
const clear = document.getElementById("clearBtn");
const goBack = document.getElementById("goBackBtn");

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
    console.log, ("cleared");
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + ": " + allScores[i].score;
        highScores.appendChild(createLi);
    }
}
goBack.addEventListener("click", function() {
    window.location.replace("./index.html");
});