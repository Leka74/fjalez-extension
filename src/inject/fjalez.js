const fjalez = () => {
  const rows = document.querySelectorAll(".pb-6")[0].children;

  const rreshtat = [];
  for (let i = 0; i < rows.length; i++) {
    const rreshti = [];
    for (let j = 0; j < rows[i].children.length; j++) {
      const cell = rows[i].children[j];
      if (!cell.innerText) break;

      const isWrongPosition = cell.classList.contains("bg-yellow-500");
      const isRightPosition = cell.classList.contains("bg-green-500");
      if (isWrongPosition) {
        rreshti.push({ letter: cell.innerText, position: "wrong" });
      } else if (isRightPosition) {
        rreshti.push({ letter: cell.innerText, position: "correct" });
      } else {
        rreshti.push({ letter: cell.innerText, position: "missing" });
      }
    }

    if (rreshti.length === 0) continue;

    rreshtat.push(rreshti);
  }

  return rreshtat;
};

const compare = (rows) => {
  const output = {};
  const invalidWords = {};

  rows.forEach((row) => {
    // Loop through the WORDS
    for (let i = 0; i < WORDS.length; i++) {
      const word = WORDS[i];
      if (invalidWords[word]) continue;

      // Loop through the row
      for (let j = 0; j < row.length; j++) {
        // Get the letter
        const letter = row[j].letter.toLowerCase();
        const position = row[j].position;

        if (position === "wrong") {
          if (word.includes(letter) && word[j] !== letter) {
            if (output[word] === undefined) output[word] = 0;
            output[word] += 1;
          } else {
            delete output[word];
            invalidWords[word] = true;
            break;
          }
        } else if (position === "correct") {
          if (word[j] === letter) {
            if (output[word] === undefined) output[word] = 0;
            output[word] += 2;
          } else {
            delete output[word];
            invalidWords[word] = true;
            break;
          }
        } else if (position === "missing") {
          if (word.includes(letter)) {
            delete output[word];
            invalidWords[word] = true;
            break;
          }
        }
      }
    }
  });

  // Sort the words
  const sorted = [];
  Object.keys(output)
    .sort((a, b) => output[b] - output[a])
    .forEach((key) => {
      sorted.push({ word: key, score: output[key] });
    });

  console.log("Rating", sorted);

  return sorted;
};
