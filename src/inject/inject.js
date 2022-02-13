chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // Execute when pressing enter
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          // Timeout to make sure the DOM updates before we get the data
          setTimeout(() => {
            const data = fjalez();
            // Process the last row only
            compare(data[data.length - 1]);
          }, 500);
        }
      });

      console.log("Loaded script");
    }
  }, 10);
});
