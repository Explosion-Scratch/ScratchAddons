export default async function ({ addon, global, console }) {
  let user1 = window.location.href.substring(30, 100);
  let username = user1.substring(0, user1.indexOf("/"));
  let details = ["projects", "favorites", "studios_following", "studios", "following", "followers"];
  for (let j = 0; j < details.length; j++) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let response = xmlhttp.responseText;
        let find = response.search("<h2>");
        let follownum = response.substring(find, find + 200).match(/\(([^)]+)\)/)[1];
        let boxHeads = document.querySelectorAll(".box-head");
        for (let i = 1; i < boxHeads.length - 1; i++) {
          if (boxHeads[i].querySelector("a")) {
            let viewAll = new URL(boxHeads[i].querySelector("a").href).pathname;
            let link = viewAll.toLowerCase().split("/users/" + username.toLowerCase() + "/")[1];
            if (link.toLowerCase() === details[j].toLowerCase() + "/") {
              let boxheadName = boxHeads[i].querySelector("h4");
              let boxVal = boxheadName.innerText.match(/\([0-9+]+\)/g);
              if (boxVal)
                boxheadName.innerText = boxheadName.innerText.substring(0, boxheadName.innerText.indexOf(boxVal[0]));
              boxheadName.innerText += ` (${follownum})`;
            }
          }
        }
      }
    };
    xmlhttp.open("GET", `https://scratch.mit.edu/users/${username}/${details[j]}/`, true);
    xmlhttp.send();
  }
}
