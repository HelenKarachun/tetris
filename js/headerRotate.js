export function mainHeaderAnimation() {
  const headerPos = document.querySelector("h1").getBoundingClientRect();
  const spans = document.querySelectorAll("h1 span");
  let currentSpanIndex = 0;
  let currentRotationDeg = 270;

  spans.forEach(elem => {
    elem.style.position = "relative";
    elem.style.top = `-${Math.ceil(headerPos.top + headerPos.height)}px`;
  })

  function moveLetters(span) {
    let currentSpanPos = parseFloat(span.style.top);

    let timer = setInterval(() => {
      currentSpanPos += Math.ceil(headerPos.height);

      span.style.top = `${currentSpanPos}px`;
      span.style.transform = `rotate(${currentRotationDeg}deg)`;

      currentRotationDeg += 90;

      if (currentSpanPos > headerPos.top - headerPos.height - span.offsetTop) {
        clearInterval(timer);
        span.style.top = 0;
        span.style.transform = `rotate(0)`;

        currentSpanIndex++;
        if (currentSpanIndex < spans.length) {
          moveLetters(spans[currentSpanIndex]);
        }
      }
    }, 700);
  }

  moveLetters(spans[0]);
}

// export function mainHeaderAnimation() {
//   const header = document.querySelector("h1");
//   const headerPos = header.getBoundingClientRect();

//   header.innerHTML = header.innerText
//     .split("")
//     .map((elem) => {
//       if (elem.toLowerCase() === 'е') {
//         return `<span class="pink">${elem}</span>`;
//       }
//       return `<span>${elem}</span>`;
//     })
//     .join("");

//   header.style.position = "relative";
//   header.style.top = `-${Math.ceil(headerPos.top + headerPos.height)}px`;

//   const spans = document.querySelectorAll('h1 span')
//   const rotationDeg = ['0deg', '90deg', '180deg', '270deg']
//   let currentSpanIndex = 0;
//   let currentRotationDegIndex = 0

//   spans.forEach(elem => elem.style.position = 'relative')

//   function moveLetters(span) {
//     const spanPos = span.getBoundingClientRect();
//     let currentSpanPos = spanPos.top;

//     let timer = setInterval(() => {
//       // const random = Math.trunc(Math.random() * 4);
//       currentSpanPos += Math.ceil(spanPos.height);

//       span.style.top = `${currentSpanPos}px`;
//       span.style.transform = `rotate(${rotationDeg[currentRotationDegIndex]})`;
      
//       currentRotationDegIndex += 1
//       if (currentRotationDegIndex === rotationDeg.length) {
//         currentRotationDegIndex = 0
//       }


//       if (currentSpanPos > headerPos.top) {
//         clearInterval(timer);
//         span.style.top = `${headerPos.top + spanPos.height}px`;
//         span.style.transform = `rotate(${rotationDeg[0]})`;

//         currentSpanIndex++;
//         if (currentSpanIndex < spans.length) {
//           moveLetters(spans[currentSpanIndex]);
//         }
//       }
//     }, 700);
//   }

//   moveLetters(spans[0]);
// }
