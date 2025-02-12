function prendslocalisation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(montreposition, showError);
    } else {
        document.getElementById("localisation").innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

function montreposition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("localisation").innerHTML = "Latitude: " + latitude + 
    "<br>Longitude: " + longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("localisation").innerHTML = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("localisation").innerHTML = "Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            document.getElementById("localisation").innerHTML = "La demande de localisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("localisation").innerHTML = "Une erreur inconnue s'est produite.";
            break;
    }};


document.addEventListener('DOMContentLoaded', (event) => {
        const draggable = document.getElementById('draggable');
        const dropZone = document.getElementById('drop-zone');
      
        draggable.addEventListener('dragstart', (event) => {
          event.dataTransfer.setData('text/plain', event.target.id);
        });
      
        dropZone.addEventListener('dragover', (event) => {
          event.preventDefault();
        });
      
        dropZone.addEventListener('drop', (event) => {
          event.preventDefault();
          const data = event.dataTransfer.getData('text');
          const draggedElement = document.getElementById(data);
          dropZone.appendChild(draggedElement);
        });
      });
      

      let worker;

document.getElementById('start-worker').addEventListener('click', () => {
  if (typeof(Worker) !== 'undefined') {
    if (!worker) {
      worker = new Worker('worker.js');
    }
    worker.postMessage(30); // Envoie une donnée au worker (facultatif)
    
    worker.onmessage = function(event) {
      document.getElementById('result').textContent = `Résultat: ${event.data}`;
    };
  } else {
    alert('Votre navigateur ne supporte pas les Web Workers.');
  }
});

document.getElementById('stop-worker').addEventListener('click', () => {
  if (worker) {
    worker.terminate();
    worker = null;
  }
});
self.onmessage = function(event) {
    const num = event.data;
    const result = computeFibonacci(num);
    postMessage(result);
  };
  
  // Fonction pour effectuer des calculs complexes
  function computeFibonacci(num) {
    if (num <= 1) return num;
    return computeFibonacci(num - 1) + computeFibonacci(num - 2);
  }
  
  // Mettre à jour périodiquement (exemple )

  const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;
let ballRadius = 20;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  
  x += dx;
  y += dy;
}

setInterval(draw, 10);

