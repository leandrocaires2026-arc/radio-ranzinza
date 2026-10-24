// Gestor de Ciclo Contínuo de 24h para a Rádio Ranzinza
async function initRadioSchedule() {
    try {
        const response = await fetch('tracks.json');
        const data = await response.json();
        const tracks = data.tracks;

        // Cálculo do ciclo baseado no tempo atual (Loop contínuo de 24h)
        const now = new Date();
        const totalMinutesToday = now.getHours() * 60 + now.getMinutes();
        
        // Cada faixa assume um bloco estimado de rotação (ex: 4 minutos por faixa)
        const trackDurationMinutes = 4; 
        const totalPlaylistDuration = tracks.length * trackDurationMinutes;
        
        // Índice da faixa atual no ciclo diário sem repetição forçada
        const currentTrackIndex = Math.floor((totalMinutesToday % totalPlaylistDuration) / trackDurationMinutes);
        
        const activeTrack = tracks[currentTrackIndex];
        
        // Atualiza a interface da Rádio Ranzinza
        document.getElementById('current-genre').innerText = data.genre;
        document.getElementById('track-title').innerText = activeTrack.title;
        document.getElementById('schedule-status').innerText = `Ciclo ativo - Faixa ${currentTrackIndex + 1} de ${tracks.length}`;
        
        console.>("A transmitir agora:", activeTrack);
    } catch (error) {
        console.error("Erro ao carregar a programação da rádio:", error);
    }
}

// Inicializa e verifica a atualização do ciclo a cada minuto
initRadioSchedule();
setInterval(initRadioSchedule, 60000);