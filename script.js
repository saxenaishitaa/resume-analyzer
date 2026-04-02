function analyzeResume() {
    let jobDesc = document.getElementById("jobDesc").value.toLowerCase();
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

let jdWords = jobDesc.split(" ");

jdWords.forEach(word => {
    if(word.length > 4 && !keywords.includes(word)){
        keywords.push(word);
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

    document.getElementById("suggestions").innerHTML =
    "<b>✅ Strong Skills:</b> " + present.join(", ") +
    "<br><b>❌ Missing Skills:</b> " + missing.join(", ");

    document.getElementById("progress-bar").style.width = percentage + "%";
}
function handleFile() {
    let file = document.getElementById("fileInput").files[0];

    if (!file) return;

    let reader = new FileReader();

    reader.onload = function() {
        let typedarray = new Uint8Array(this.result);

        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            let text = "";

            let pages = [];

            for(let i = 1; i <= pdf.numPages; i++){
                pages.push(
                    pdf.getPage(i).then(page =>
                        page.getTextContent().then(content => {
                            content.items.forEach(item => {
                                text += item.str + " ";
                            });
                        })
                    )
                );
            }

            Promise.all(pages).then(() => {
                document.getElementById("resumeText").value = text;
            });
        });
    };

    reader.readAsArrayBuffer(file);
}
function clearText(){
    document.getElementById("resumeText").value = "";
    document.getElementById("score").innerText = "";
    document.getElementById("suggestions").innerText = "";
    document.getElementById("progress-bar").style.width = "0%";
}