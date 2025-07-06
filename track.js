
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
