function showContent(contentId) {
    // Hide all content sections
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });

    // Show the selected content section
    document.getElementById(contentId).style.display = 'block';
    if (sidebar.style.left === "20px") {
        sidebar.style.left = "-750px";
    }
}

//when page load it display content 1
window.onload = function () {
    document.getElementById("content1").style.display = 'block';
}


var current = null;
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var sections = document.querySelectorAll('.content-section');

    if (sidebar.style.left === "20px") {
        sidebar.style.left = "-750px";
        document.getElementById(current).style.display = 'block';
    }
    else {
        sidebar.style.left = "20px";
        sections.forEach(function (section) {
            if (section.style.display === 'block') {
                current = section.id
            }
            section.style.display = 'none';
        });
    }

    document.addEventListener('click', function (Event) {
        var sidebar = document.getElementById("sidebar");
        var sections = document.querySelectorAll('.content-section');
        sections.forEach(function (section) {
            if (section.style.display === 'block') {
                current = section.id
            }
            section.style.display = 'none';
        });
        if (!sidebar.contains(Event.target) && Event.target.id !== "hamburger" && Event.target.id !== "sidebar") {
            sidebar.style.left = "-750px";
            document.getElementById(current).style.display = 'block';
        }
        if (sidebar.style.left === "-750px") {
            document.getElementById(current).style.display = 'block';
        }
    });

    window.addEventListener("resize", function () {
        let currentWidth = window.innerWidth;

        if (currentWidth > 650) {
            document.getElementById("sidebar").style.left = "-750px";
            document.getElementById(current).style.display = 'block';
        }
    });
}

function togglelist() {
    var list = document.getElementById("list");
    var arrowdown = document.getElementById("arrowdown");
    var arrowup = document.getElementById("arrowup");
    if (list.style.top === "-200px") {
        list.style.top = "80px";
        arrowdown.style.display = "none";
        arrowup.style.display = "block";
    }
    else {
        list.style.top = "-200px";
        arrowup.style.display = "none";
        arrowdown.style.display = "block";
    }

    document.addEventListener('click', function (Event) {
        var list = document.getElementById("list");
        var arrowdown = document.getElementById("arrowdown");
        var arrowup = document.getElementById("arrowup");
        if (!list.contains(Event.target) && Event.target.id !== "arrowdown" && Event.target.id !== "arrowup") {
            list.style.top = "-200px";
            arrowup.style.display = "none";
            arrowdown.style.display = "block";
        }
    });

    let previousWidth = window.innerWidth;
    window.addEventListener("resize", function () {
        let currentWidth = window.innerWidth;

        if (currentWidth > 650) {
            document.getElementById("list").style.top = "-200px";
            document.getElementById("arrowup").style.display = "none";
            document.getElementById("arrowdown").style.display = "none";
        }
        else if (previousWidth > 650) {
            document.getElementById("arrowdown").style.display = "block";
        }
        previousWidth = currentWidth;
    });
}


function checkAnswers() {
    const ans1 = document.getElementById("dropdown").getAttribute("data-expected-answer");
    const ans2 = document.getElementById("true").getAttribute("data-expected-answer");
    const ans3 = [document.getElementById("a1").getAttribute("data-expected-answer"),
    document.getElementById("a2").getAttribute("data-expected-answer"),
    document.getElementById("a3").getAttribute("data-expected-answer")];

    let isCorrect = true;
    let resultElement = document.getElementById("result")
    let resultMessage = "";

    // Check question 1 (Dropdown)
    let dropdown = document.getElementById("dropdown").value;
    if (dropdown !== ans1) {
        isCorrect = false;
    }

    // Check question 2 (Radio)
    let isFalseSelected = document.getElementById("false").checked;
    if (isFalseSelected && ans2 === "true") {
        isCorrect = false;
    }
    if (!isFalseSelected && ans2 === "false") {
        isCorrect = false;
    }


    // Check question 3 (Checkboxes)
    let a1 = document.getElementById("a1").checked;
    let a2 = document.getElementById("a2").checked;
    let a3 = document.getElementById("a3").checked;

    if (ans3[0] !== String(a1) || ans3[1] !== String(a2) || ans3[2] !== String(a3)) {
        isCorrect = false;
    }

    // Result Message
    if (isCorrect) {
        resultMessage = "All answers are correct!";
        resultElement.style.color = "green";
    } else {
        resultMessage = "There are wrong answer(s). Please try again.";
        resultElement.style.color = "red";
    }

    resultElement.classList.remove('fade')
    void resultElement.offsetWidth;
    resultElement.classList.add('fade');

    resultElement.textContent = resultMessage;
}

