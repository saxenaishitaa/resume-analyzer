function analyzeResume() {

    let text = document.getElementById("resumeText").value.toLowerCase();
    let role = document.getElementById("role").value;

    let keywords = [];

    if(role === "frontend"){
        keywords = ["html", "css", "javascript", "react"];
    }
    else if(role === "backend"){
        keywords = ["node", "sql", "api", "database"];
    }
    else if(role === "java"){
        keywords = ["java", "dsa", "oops", "spring"];
    }

    let score = 0;
    let missing = [];
    let present = [];

    keywords.forEach(function(word) {
        if (text.includes(word)) {
            score += 10;
            present.push(word);
        } else {
            missing.push(word);
        }
    });

    let percentage = (score / (keywords.length * 10)) * 100;

    let scoreText = document.getElementById("score");

    let verdict = "";

    if(percentage > 75){
        verdict = "🔥 Strong Resume";
    }
    else if(percentage > 50){
        verdict = "👍 Average Resume";
    }
    else{
        verdict = "⚠ Needs Improvement";
    }

    scoreText.innerHTML = "Score: " + percentage.toFixed(0) + "%<br>" + verdict;

    document.getElementById("suggestions").innerText =
        "✅ Strong: " + present.join(", ") +
        "\n❌ Missing: " + missing.join(", ");

    document.getElementById("progress-bar").style.width = percentage + "%";
}