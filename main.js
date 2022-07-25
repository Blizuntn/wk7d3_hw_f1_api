formEl = document.getElementById("raceForm");
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let seasonInput = document.getElementById("seasonInput");
  let roundInput = document.getElementById("roundInput");
  let tableEl = document.getElementById("driver_data");
  tableEl.innerHTML = " ";

  let url = `https://ergast.com/api/f1/${seasonInput.value}/${roundInput.value}/driverStandings.json`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayStandings(data));
});

function displayStandings(data) {
  let standings = data;
  let standingsList =
    standings["MRData"]["StandingsTable"]["StandingsLists"][0][
      "DriverStandings"
    ];
  let tableEl = document.getElementById("driver_data");

  console.log(standingsList);
  for (let i = 0; i < 8; i++) {
    console.log(standingsList[0]["Driver"]["givenName"]);
    let tableHTML = `
  <tr>
    <td>${standingsList[i]["position"]}</td>
    <td>${standingsList[i]["Driver"]["givenName"]}</td>
    <td>${standingsList[i]["Constructors"][0]["nationality"]}</td>
    <td>${standingsList[i]["Constructors"][0]["name"]}</td>
    <td>${standingsList[i]["points"]}</td>
  </tr>
    `;
    tableEl.innerHTML += tableHTML;
  }
}
