const headlineText = "Five Beautiful Years";
const headline = document.getElementById("headline");
let char = 0;

function typeWriter() {
  if (char < headlineText.length) {
    headline.innerHTML += headlineText.charAt(char);
    char++;
    setTimeout(typeWriter, 100);
  }
}

typeWriter();


const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


function revealAnswer() {
  document.getElementById('answer').style.display = 'block';
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}
function togglePhoto(element) {

  element.classList.toggle('expanded');
}
function revealAnswer(answer) {
  var answerText = document.getElementById('answer');
  
  if (answer === 'yes') {
    answerText.textContent = "Dahil dyan promise ko sayong sayo agad dederetso ang sweldo ko";
    answerText.style.color = "green";
  } else {
    answerText.textContent = "magkaroon sana ng comatose yang bagong asawa mo at kapag nakita koyung anak niyo pagbubuhulin ko kayo magiina";
    answerText.style.color = "red";
  }
  
  answerText.style.display = "block"; // Show the answer
}
