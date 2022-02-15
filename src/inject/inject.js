chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // Check if the app is on light mode or dark mode
      const root = document.getElementsByTagName("html")[0];
      let isDarkMode = root.classList.contains("dark");

      // Create html element to display the data on the page
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "10px";
      container.style.right = "10px";
      container.style.color = isDarkMode ? "white" : "#0f172a";
      container.style.fontSize = "12px";
      container.innerHTML = "Press Enter to process data";
      document.body.append(container);

      // Find the header
      const header = document.getElementsByClassName(
        "flex w-80 mx-auto items-center mb-8 mt-12"
      )[0];
      // Find the dark/light mode button and add a listener to update the text color
      header.children[1].addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        container.style.color = isDarkMode ? "white" : "#0f172a";
      });

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
