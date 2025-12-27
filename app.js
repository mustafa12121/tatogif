let wordsContainer = document.querySelector("section");
let i = 0;
// fill this info abuot you and the birthday person
let birthdayPerson = {
  personName: "Ayaat",
  birthdaySong: "./songs/song1.mp3",
  fivColor: "black",
  secandColor: "purple",
  imgeSrc: "./img/pro.jpg",
  yourPhone: "249962002351",
  birthday: 8,
  open: true,
};

let button = document.getElementById("show");
let {
  personName,
  birthdaySong,
  fivColor,
  secandColor,
  imgeSrc,
  yourPhone,
  birthday,
  open,
} = birthdayPerson;
let text = [
  `Hello ${personName}`,
  "I where thinking",
  "abut somthing to do",
  "for your birthday",
  "and i make this😌",
  "the first time I meet you",
  "i thought you were",
  "just a normal girl",
  "and we were focused on",
  "someone else 😅",
  "any way 😁",
  "after some time",
  "turns out that ",
  "you're not nurmal 🙂",
  "you're Special🎇,",
  "Strong✊,",
  "Kind😇,",
  "Crazy😛 hhh in a good way😊",
  "Don't let anyone",
  "tell you otherwise",
  "be who you want to be",
  "as long as ",
  "what you doing is right",
  "Wish you a Long Good live",
  `🎇happy birthday ${personName}🎇`,
  "",
];

//adding the fiv colors
wordsContainer.style = `background-color:${fivColor};color:${secandColor}`;
button.style = `background-color:${secandColor}`;
let sond = document.querySelector("audio");
sond.src = birthdaySong;
// puting the condetion to stop the page whene it's not the birthday
let time = new Date();
setInterval(() => {
  time = new Date();
}, 100000);

// Only allow the app to open on the date you set (month 0 = January)
function isTodayBirthday() {
  return time.getMonth() === 0 && time.getDate() === birthday;
}

if (isTodayBirthday()) {
  let pass = window.prompt("the password");
  if (pass === "Web123@") {
    window.onload = () => {
      button.addEventListener("click", () => {
        fulScreen();
        getWords(text);
        runMousc();
        changOpacity(document.querySelector("button"), false, 50, 0.01);
      });
    };
  } else {
    wordsContainer.remove();
  }
} else {
  // show countdown until the next occurrence of the chosen day
  let main = document.querySelector("main section");
  main.innerHTML = "";
  let tip = document.createElement("p");
  tip.className = "not-time";
  main.appendChild(tip);
  let next = new Date(time.getFullYear(), 0, birthday, 0, 0, 0, 0);
  if (time > next) {
    next.setFullYear(next.getFullYear() + 1);
  }
  putTheTime(tip, next);
}

function fulScreen() {
  document.querySelector("#root").requestFullscreen();
}

function getWords(text) {
  let wordsHandler = setInterval(() => {
    wordsContainer.innerHTML = "";
    botWords(Array.from(text[i]));
    i++;
    if (i > text.length - 1) {
      clearInterval(wordsHandler);
      putImage();
    }
  }, 5000);
}

function runMousc() {
  sond.play();
}

function botWords(letterArray) {
  for (let j = 0; j < letterArray.length; j++) {
    creatLetterSpan(letterArray[j]);
  }
}

function creatLetterSpan(letter) {
  let span = document.createElement("span");
  span.innerText = letter;
  span.style = `transform:translate(${randomPostion()})`;
  if (letter == " ") {
    span.style.width = "10px";
  }
  wordsContainer.appendChild(span);
}

function randomPostion() {
  let found = false;
  while (!found) {
    let postinX = Math.trunc(Math.random() * 100);
    let postinY = Math.trunc(Math.random() * 100);
    postinX = randomSign(postinX);
    postinY = randomSign(postinY);
    if ((postinX > 60) | (postinX < -60)) {
      return [`${postinX}vw`, `${postinY}vh`].join();
    } else if ((postinY > 60) | (postinY < -60)) {
      return [`${postinX}vw`, `${postinY}vh`].join();
    }
  }
}

function randomSign(axe) {
  let sign = Math.round(Math.random() * 3);
  if (sign < 1) {
    return axe;
  }
  return -axe;
}

function putImage() {
  let contain = document.createElement("div");
  contain.className = "contain";
  let box = document.createElement("div");
  contain.appendChild(box);
  let image = document.createElement("img");
  image.src = imgeSrc;
  image.classList.add("profile");
  box.appendChild(image);
  box.className = "box";
  let p = document.createElement("p");
  p.innerText = "Violet_Evergardern";
  contain.appendChild(p);
  let p2 = document.createElement("p");
  p2.innerText = "go back to whatsapp";
  contain.appendChild(p2);
  let link = document.createElement("a");
  link.href = `https://wa.me/${yourPhone}`;
  link.appendChild(contain);
  wordsContainer.appendChild(link);
  startAppering();
}

function startAppering() {
  let box = document.querySelector(".contain");
  changOpacity(box);
}

function changOpacity(ele, dierction = true, timing = 100, value = 0.1) {
  if (dierction == true) {
    let iter = setInterval(() => {
      ele.style.opacity = +ele.style.opacity + +value;
      if (ele.style.opacity == 1) {
        clearInterval(iter);
      }
    }, timing);
  } else {
    let opac = 1;
    let iter = setInterval(() => {
      ele.style.opacity = opac - +value;
      opac -= value;
      if (opac == 0) {
        clearInterval(iter);
      }
    }, timing);
  }
}

function putTheTime(ele, target) {
  const msPerDay = 24 * 60 * 60 * 1000;
  ele.style.fontSize = "1.3rem";
  ele.style.fontWeight = "bold";
  function update() {
    const now = new Date();
    const diffMs = target - now;
    if (diffMs <= 0) {
      ele.innerText = `It's the day! 🎉`;
      return;
    }
    const days = Math.ceil(diffMs / msPerDay);
    if (days === 1) {
      ele.innerText = `The opening is tomorrow`;
    } else {
      ele.innerText = `${days} days until opening`;
    }
  }
  update();
  setInterval(update, 1000);
}
