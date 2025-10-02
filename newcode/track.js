
// track.js
(function() {
  function updatePageHistory() {
    const pathHistory = JSON.parse(localStorage.getItem("pageHistory") || "[]");
    const currentPage = location.pathname.split("/").pop();

    if (pathHistory[pathHistory.length - 1] !== currentPage) {
      pathHistory.push(currentPage);
      localStorage.setItem("pageHistory", JSON.stringify(pathHistory));
    }
  }

  window.addEventListener("pageshow", updatePageHistory);

})();

(function() {
  function updatePageHistory() {
    const pathHistory = JSON.parse(localStorage.getItem("pageHistory") || "[]");
    const currentPage = location.pathname.split("/").pop();

    if (pathHistory[pathHistory.length - 1] !== currentPage) {
      pathHistory.push(currentPage);
      if (pathHistory.length > 100) pathHistory.shift();
      localStorage.setItem("pageHistory", JSON.stringify(pathHistory));
    }

    // GAS送信処理
    const apiURL = "https://script.google.com/macros/s/AKfycbzFMy8XoOnNS-jgl_OWVsk-VlL1F9safbBj4BQAlCZZ0VNPMhzRD12-4DYByQj7SmXu1Q/exec";
    const params = new URLSearchParams({
      action: "visit",
      history: pathHistory.join(" → "),
      page: currentPage
    });

    fetch(`${apiURL}?${params.toString()}`)
      .then(response => response.text())
      .then(data => console.log("訪問記録成功:", data))
      .catch(err => console.error("訪問記録エラー:", err));
  }

  window.addEventListener("pageshow", updatePageHistory);
})();

