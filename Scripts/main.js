async function profile() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("user");
  window.location.href = "../../profile/?user=" + username;
}
