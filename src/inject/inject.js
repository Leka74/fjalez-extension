chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // Create html element to display the data on the page
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "10px";
      container.style.right = "10px";
      container.style.color = "white";
      container.style.fontSize = "12px";
      container.innerHTML = "Press Enter to process data";
      document.body.append(container);

      // Execute when pressing enter
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          // Timeout to make sure the DOM updates before we get the data
          container.innerHTML = "Loading...";
          setTimeout(() => {
            const data = fjalez();
            // Process the last row only
            const rating = compare(data);

            container.innerHTML = rating
              .map((item) => `<li>${item.word}: ${item.score}</li>`)
              .join("\n");
          }, 200);
        }
      });

      console.log("Loaded script");
    }
  }, 10);
});
