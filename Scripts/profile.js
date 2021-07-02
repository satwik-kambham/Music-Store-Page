let editMode = false;
function editProfile() {
  let ids = ["Username", "Email", "Mobile", "Subscription"];
  if (!editMode) {
    ids.forEach((id) => {
      let e = document.getElementById(id);
      let text = e.innerText;
      e.innerHTML = `<input value='${text}' id='${id + "1"}'/>`;
    });
    document.getElementById("editbtn").innerText = "Save Changes";
  } else {
    ids.forEach((id) => {
      let e = document.getElementById(id + "1");
      let text = e.value;
      e.outerHTML = `${text}`;
    });
    document.getElementById("editbtn").innerText = "Edit Profile";
  }
  editMode = !editMode;
}
