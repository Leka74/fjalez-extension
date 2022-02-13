chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // Execute when pressing enter
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const data = fjalez();
          // Process the last row only
          compare(data[data.length - 1]);
        }
      });

      console.log("Loaded script");
    }
  }, 10);
});
