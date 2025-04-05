const selectTag = document.querySelector(".select-element");
const elementContent = document.querySelector(".element-content")
const textareaEnglish = document.querySelector(".textarea-eng");
const textareaViet = document.querySelector(".textarea-viet");
const htmlContent = document.querySelector(".html-content")

let ctr = 0
if (typeof (Storage) !== "undefined") {
   if (localStorage.lineNum) {
      document.querySelector(".start").value = Number(localStorage.lineNum)
   } else {
      document.querySelector(".start").value = 0
   }
}
const result = document.querySelector(".result");
let selectedTag;
selectTag.addEventListener("change", (event) => {
   selectedTag = event.target.value
   if (selectedTag === "img") {
      textareaEnglish.value += '<img src="" alt="" />\n'
   }
});

function handleCopyTextAreaEnglish() {
   textareaEnglish.select();
   navigator.clipboard.writeText(textareaEnglish.value)
}

function handleCopyTextAreaHTMLContent() {
   htmlContent.select();
   navigator.clipboard.writeText(htmlContent.value)
}

function handleHTMLContent() {
   ctr = Number(document.querySelector(".start").value)
   if (!selectTag.value) { alert("choose an html element"); return }
   switch (selectTag.value) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
         processHTMLHeader();
         break;
      case "p":
         handleMultiParagraphs();
         break;
      case "ul":
         handleUl();
         break;
      case "pre":
         handlePre();
         break;
      default:
         break;
   }
   document.getElementById("sel")[0].selected = true;
}

function handlePre() {
   textareaEnglish.value += "<pre class='english'>\n";
   textareaEnglish.value += elementContent.value.replaceAll("<", "&lt;");
   textareaEnglish.value += "\n</pre>\n";
   elementContent.value = "";
}

function getElementContentValue() {
   return elementContent.value.replaceAll("<", "&lt;").trim()
}

function increaseLineNo() {
   ctr++;
   document.querySelector(".start").value = ctr;
   localStorage.setItem("lineNum", ctr)
   elementContent.value = ""
}

function handleH1() {
   ctr = Number(document.querySelector(".start").value)

   const elCt = getElementContentValue()
   if (elCt.length > 0) {
      textareaEnglish.value += `<h1><span class="english ${ctr}">${elCt}</span>\n`;
      increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
}

function handleH2() {
   ctr = Number(document.querySelector(".start").value)

   const elCt = getElementContentValue()
   if (elCt.length > 0) {
      textareaEnglish.value += `<h2><span class="english ${ctr}">${elCt}</span>\n`;
      increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
}

function handleH3() {
   ctr = Number(document.querySelector(".start").value)

   const elCt = getElementContentValue()
   if (elCt.length > 0) {
      textareaEnglish.value += `<h3><span class="english ${ctr}">${elCt}</span>\n`;
      increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
}

function handleH4() {
   ctr = Number(document.querySelector(".start").value)

   const elCt = getElementContentValue()
   if (elCt.length > 0) {
      textareaEnglish.value += `<h4><span class="english ${ctr}">${elCt}</span>\n`;
      increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
}

function handleImg() {
   const elCt = getElementContentValue()
   if (elCt.length > 0) {
      textareaEnglish.value += `<img src="./images/${elCt}.png" alt="${elCt}">\n`;
      increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
}

function handleVideo() {
   const elCt = getElementContentValue()
   if (elCt.length > 0) {
      textareaEnglish.value += `<video width="600" controls><source scr="./images/${elCt}.mp4" type="video/mp4"></video>\n`;
      increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
}

function processHTMLHeader() {
   console.log(elementContent.value)
   textareaEnglish.value += `<${selectedTag}><span class="english ${ctr}">${elementContent.value.replaceAll("<", "&lt;").trim()}</span>\n`;
   ctr++;
   document.querySelector(".start").value = ctr;
   localStorage.setItem("lineNum", ctr)
   elementContent.value = ""
}

function processParagraph(paragraph) {

   console.log(paragraph)
   // use '~' to seperate
   const arrayLines = paragraph
      .replaceAll("? ", "?~ ")
      .replaceAll(", ", ",~ ")
      .replaceAll("; ", ";~ ")
      .replaceAll(": ", ":~ ")
      .replaceAll(".” ", ".”~ ")
      .replaceAll(",' ", ",'~ ")
      .replaceAll("?” ", "?”~ ")
      .replaceAll("! ", "!~ ")
      .replaceAll("St.", "St ")
      .replace("e.g.", "thidu")
      .replaceAll("i.e.", "thidu")
      .replace("code .", "vscodedot")
      .replaceAll(". ", ".~ ")
      .split("~")
      .map(item => {
         return `<span class="english ${ctr++}"> ${item}</span>\n`;
      })
   textareaEnglish.value += arrayLines
      .map((item, index) => {
         if (index === 0) {
            return "<p>" + item;
         }
         else if (index === arrayLines.length - 1) {
            return "<pend>" + item
         }
         else {
            return "<pmid>" + item
         }
      })
      .join("")

}
function handleMultiParagraphs() {
   ctr = Number(document.querySelector(".start").value)

   // handle multi paragraphs
   const arrayParagraphs = elementContent.value.replaceAll("<", "&lt;").split("\n")

   arrayParagraphs.forEach((paragraph) => {
      if (paragraph.length > 1) {
         processParagraph(paragraph)
      }
   })
   increaseLineNo()
}

function handleUl() {
   const arrayLi = elementContent.value.split("\n")
   arrayLi.forEach((liItem) => {
      if (liItem.length > 1) {
         textareaEnglish.value += `<li><span class="english ${ctr}">${liItem}</span>\n`;
         ctr++;
      }
   })
   increaseLineNo()
}

function handleCombine() {
   const textEng = document.querySelector(".textarea-eng")
   const textViet = document.querySelector(".textarea-viet")
   const arrEng = textEng.value.split("\n")
   const arrViet = textViet.value.split("\n")
   document.querySelector(".arrayenglish-len").textContent = arrEng.length
   document.querySelector(".arrayviet-len").textContent = arrViet.length

   if (arrEng.length === arrViet.length) {
      let str1 = ""
      for (let i = 0; i < arrEng.length; i++) {
         arrViet[i] = arrViet[i].replace("english", "viet")
         arrViet[i] = arrViet[i].replace('">', ' hide">')

         if (arrEng[i].includes("<pre")) {
            str1 += `${arrEng[i]}\n`;
            i++;
            do {
               console.log(arrEng[i])
               str1 += `${arrEng[i]}\n`;
               i++;
            } while (arrEng[i] !== "</pre>")
            str1 += `${arrEng[i]}\n`;
         } else if (arrEng[i].includes("<p>") && i === arrEng.length - 1) {
            str1 += `${arrEng[i]}${arrViet[i].slice(3)}</p>\n`
         } else if (arrEng[i].includes("<p>") && i < arrEng.length - 1) {
            if (arrEng[i + 1].includes("<pmid>") || arrEng[i + 1].includes("<pend>")) {
               str1 += `${arrEng[i]} ${arrViet[i].slice(3)}\n`
            } else {
               str1 += `${arrEng[i]} ${arrViet[i].slice(3)}</p>\n`
            }
         } else {
            console.log(arrEng[i].slice(0, 4) + "--------------")
            switch (arrEng[i].slice(0, 4)) {
               case "<img":
               case "<vid":
                  str1 += `${arrEng[i]}\n`
                  break;
               case "<h1>":
                  str1 += `${arrEng[i]} ${arrViet[i].slice(4)}</h1>\n`
                  break;
               case "<h2>":
                  str1 += `${arrEng[i]} ${arrViet[i].slice(4)}</h2>\n`
                  break;
               case "<h3>":
                  str1 += `${arrEng[i]} ${arrViet[i].slice(4)}</h3>\n`
                  break;
               case "<h4>":
                  str1 += `${arrEng[i]} ${arrViet[i].slice(4)}</h4>\n`
                  break;
               case "<li>":
                  str1 += `${arrEng[i]} ${arrViet[i].slice(4)}</li>\n`
                  break;
               case "<pmi":
                  str1 += `${arrEng[i].slice(6)} ${arrViet[i].slice(6)}\n`
                  break;
               case "<pen":
                  str1 += `${arrEng[i].slice(6)} ${arrViet[i].slice(6)}</p>\n`
                  break;
            }
         }
      }

      result.innerHTML = str1
      const allEnglishElement = document.querySelectorAll(".english");
      const allVietElement = document.querySelectorAll(".viet");

      allEnglishElement.forEach((item, index) => {
         item.addEventListener("click", (event) => handleClick(event))
      })

      function handleClick(event) {
         if (event.target.classList.length > 1) {
            const index = Number(event.target.classList[1])
            allVietElement.forEach(e => {
               if (e.classList[1] === event.target.classList[1]) {
                  e.classList.contains("hide")
                     ? e.classList.remove("hide")
                     : e.classList.add("hide")
               }
            })
         }
      }
   }
}
function handleCombine1() {
   handleCombine()
   htmlContent.textContent = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
* {
    cursor: pointer;
}

.hide {
    display: none
}

.viet {
    background-color: yellow;
}
img { width: 75%;}
</style>

<body>
<div>
      <div>
       <button id="stop">Stop!</button>
       <button id="speak">Speak</button>
       <button id="dung">Dừng</button>
       <button id="doc">Đọc</button>
      </div>
    </div>
    ${result.innerHTML}
<script>
const allEnglishElement = document.querySelectorAll(".english");
const allVietElement = document.querySelectorAll(".viet");

allEnglishElement.forEach((item, index) => {
    item.addEventListener("click", (event) => handleClick(event))
})

function handleClick(event) {
    const index = Number(event.target.classList[1])
   allVietElement.forEach(e => {
      if (e.classList[1] === event.target.classList[1]) {
         e.classList.contains("hide")
            ? e.classList.remove("hide")
            : e.classList.add("hide")
      }
   })

}
const msg = new SpeechSynthesisUtterance();
let voice = [];
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const dungButton = document.querySelector('#dung');
const docButton = document.querySelector('#doc');

function toggle_E(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        arr_len = document.getElementsByClassName('english').length;
        console.log(arr_len);
        let txt1 = '';
        for (let i = 0; i < arr_len; i++) {
            temp_txt = document.getElementsByClassName('english')[i].innerHTML;
            temp_txt = temp_txt.trim() + '.\\n';
            console.log(temp_txt);
            txt1 += temp_txt;
        }
        arr1 = txt1.split('\\n');
        arr1 = arr1.map((e) => e.trim());
        // arr1[0] += '.';
        arr1 = arr1.join(' ');
        console.log(arr1);
        msg.text = arr1;

        msg.lang = 'en-US';
        speechSynthesis.speak(msg);
    }
}

function toggle_V(startOver = true) {
    speechSynthesis.cancel();
    allVietElement.forEach(e => e.classList.remove("hide"))

    if (startOver) {
        arr_len = document.getElementsByClassName('viet').length;
        console.log(arr_len);
        let txt1 = '';
        for (let i = 0; i < arr_len; i++) {
            temp_txt = document.getElementsByClassName('viet')[i].innerHTML;
            temp_txt = temp_txt.trim() + '.\\n';
            console.log(temp_txt);
            txt1 += temp_txt;
        }
        arr1 = txt1.split('\\n');
        arr1 = arr1.map((e) => e.trim());
        // arr1[0] += '.';
        arr1 = arr1.join(' ');
        console.log(arr1);
        msg.text = arr1;

        msg.lang = 'vi-VN';
        speechSynthesis.speak(msg);
    }
}

speakButton.addEventListener('click', toggle_E);
stopButton.addEventListener('click', toggle_E.bind(null, false));
docButton.addEventListener('click', toggle_V);
dungButton.addEventListener('click', toggle_V.bind(null, false));

    </script>
</body>

</html>
`
}

function handleCombine2() {
   handleCombine()
   htmlContent.textContent = `${result.innerHTML} `

}
