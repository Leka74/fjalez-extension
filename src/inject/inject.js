chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // Execute when pressing enter
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const data = fjalez();
          console.log(data);
        }
      });

      console.log("Loaded script");
    }
  }, 10);
});
