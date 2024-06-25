window.addEventListener("message", (event) => {
  switch (event.data.action) {
    case "open":
      Open(event.data);
      break;
    case "close":
      Close();
      break;
    case "setup":
      Setup(event.data);
      break;
  }
});

const Open = (data) => {
  $(".scoreboard-block").fadeIn(150);
  $("#total-players").html("<p>" + data.players + " of " + data.maxPlayers + "</p>");
  $("#total-cops").html("<p>" + (data.currentCops > 0 ? data.currentCops : '<i class="fas fa-times"></i>') + "</p>");
  $("#total-ambulance").html("<p>" + (data.currentAmbulance > 0 ? data.currentAmbulance : '<i class="fas fa-times"></i>') + "</p>");
  $("#total-mechanic").html("<p>" + (data.currentMechanic > 0 ? data.currentMechanic : '<i class="fas fa-times"></i>') + "</p>");

  $.each(data.requiredCops, (i, category) => {
    var beam = $(".scoreboard-info").find('[data-type="' + i + '"]');
    var status = $(beam).find(".info-beam-status");

    // For anyone wondering, this does work, you can leave the brackets out if you have just one line of code to execute
    if (category.busy)
      $(status).html('<i class="fas fa-clock"></i>');
    else if (data.currentCops >= category.minimumPolice)
      $(status).html('<i class="fas fa-check"></i>');
    else
      $(status).html('<i class="fas fa-times"></i>');
  });
};

const Close = () => {
  $(".scoreboard-block").fadeOut(150);
};

const Setup = (data) => {
  let scoreboardHtml = "";
  $.each(data.items, (index, value) => {
    scoreboardHtml += `
      <div class="scoreboard-info-beam" data-type=${index}>
        <div class="info-beam-title">
            <p>${value}</p>
        </div>
        <div class="info-beam-status"></div>
      </div>
    `;
  });
  scoreboardHtml += `
    <div class="scoreboard-info-beam">
      <div class="info-beam-title-players">
        <p>Cops Online</p>
      </div>
      <div class="info-beam-status" id="total-cops" style="color: #ededed"></div>
    </div>
  `;
  scoreboardHtml += `
    <div class="scoreboard-info-beam">
      <div class="info-beam-title-players">
        <p>EMS Online</p>
      </div>
      <div class="info-beam-status" id="total-ambulance" style="color: #ededed"></div>
    </div>
  `;
  scoreboardHtml += `
    <div class="scoreboard-info-beam">
      <div class="info-beam-title-players">
        <p>Mechanic Online</p>
      </div>
      <div class="info-beam-status" id="total-mechanic" style="color: #ededed"></div>
    </div>
  `;
  scoreboardHtml += `
    <div class="scoreboard-info-beam" style="background: #dc143c">
      <div class="info-beam-title-players">
        <p>Total Players</p>
      </div>
      <div class="info-beam-status" id="total-players" style="color: #ededed"></div>
    </div>
  `;
  $(".scoreboard-info").html(scoreboardHtml);
};
