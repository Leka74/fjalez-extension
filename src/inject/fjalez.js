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

    rreshtat.push(rreshti);
  }

  return rreshtat;
};
