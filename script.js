// script.js

// Array com dados dos vídeos, incluindo o link do vídeo e o link para download
const videos = [
    { title: "v3.0", link: "https://www.youtube.com/watch?v=1CuDRCr-NS8", description: "v3.0 tema hacker independente de conexao a internet!", downloadLink: "https://drive.google.com/file/d/1L6Etl0LGpHKQQgAOBvEaJ0TvZopQyzBR/view" },
    
    // Adicione mais vídeos conforme necessário
];

// Função para carregar os vídeos dinamicamente
function loadVideos() {
  const videoContainer = document.getElementById('videoContainer');
  videoContainer.innerHTML = ''; // Limpa o conteúdo anterior

  // Adiciona os vídeos ao container
  videos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.classList.add('video');
    
    // Extrai o ID do vídeo da URL do link
    const videoId = video.link.split('v=')[1];

    // Criação do layout de cada vídeo com o link embed do YouTube
    videoElement.innerHTML = `
      <div class="video-thumbnail" onclick="openVideo('${video.link}', '${video.description}', '${video.downloadLink}')">
        <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="Video Thumbnail">
        <h3>${video.title}</h3>
      </div>
    `;
    
    videoContainer.appendChild(videoElement);
  });
}

// Função para abrir o vídeo expandido (modal)
function openVideo(videoLink, description, downloadLink) {
  const videoId = videoLink.split('v=')[1]; // Extrai o ID do vídeo a partir do link
  const videoExpanded = document.getElementById('videoExpanded');
  const videoPlayer = document.querySelector('.video-player');
  const videoInfo = document.getElementById('videoInfo');

  // Criação do iframe do player do YouTube
  videoPlayer.innerHTML = `
    <iframe id="youtubePlayer" width="100%" height="500" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
  
  // Exibe a descrição fixa do vídeo
  videoInfo.innerHTML = `
    <h2>${description}</h2>
    <a href="${downloadLink}" target="_blank">
      <button>Download</button>
    </a>
  `;

  // Exibe a tela expandida
  document.getElementById('videoContainer').style.display = 'none'; // Esconde a lista de vídeos
  videoExpanded.style.display = 'flex'; // Exibe a tela expandida
}

// Função para voltar à tela de todos os vídeos e pausar o vídeo
function closeExpandedVideo() {
  const videoExpanded = document.getElementById('videoExpanded');
  const videoContainer = document.getElementById('videoContainer');

  // Pausa o vídeo ao voltar
  const iframe = document.getElementById('youtubePlayer');
  const iframeSrc = iframe.src;
  iframe.src = ''; // Remove o src para parar a reprodução
  iframe.src = iframeSrc; // Reatribui o src para carregar o player novamente

  // Volta à tela de vídeos
  videoExpanded.style.display = 'none';
  videoContainer.style.display = 'grid'; // Exibe a lista de vídeos
}

// Carregar vídeos ao inicializar
window.onload = loadVideos;
