const fs = require('fs');
const scheduleData = require('./schedule.json');

function getCurrentGenreBlock() {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 12) {
    return scheduleData.blocks[0];
  } else {
    return scheduleData.blocks[1];
  }
}

function startBroadcastStream() {
  console.log(`[TRANSMISSÃO AO VIVO] Bem-vindo à ${scheduleData.stationName}!`);
  console.log(`[MODO] ${scheduleData.mode}\n`);

  setInterval(() => {
    const activeBlock = getCurrentGenreBlock();
    const randomTrack = activeBlock.tracks[Math.floor(Math.random() * activeBlock.tracks.length)];
    
    if (randomTrack) {
      console.log(`[NO AR AGORA] Bloco: ${activeBlock.genre} (${activeBlock.timeSlot})`);
      console.log(`-> Tocando faixa: ${randomTrack.title} [ID Drive: ${randomTrack.driveId}]`);
    }
  }, 10000);
}

startBroadcastStream();