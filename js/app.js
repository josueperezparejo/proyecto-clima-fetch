// Variables & Selectores
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// Eventos
window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
});

// Funciones
function buscarClima(event) {
  event.preventDefault();
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais');
  const paisValue = pais.value;
  const paisName = pais.options[pais.selectedIndex].text;

  if (ciudad === '' || pais === '') {
    mostrarError('Todos los Campos son Obligatorios')
    return;
  }

  consultarAPI(ciudad, paisValue, paisName);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.active-alert');

  if (!alerta) {
    const alerta = document.createElement('div');
    alerta.classList.add('active-alert', 'text-danger', 'text-center', 'my-3', 'p-2', 'rounded-2', 'fw-bold', 'bg-light');
    alerta.innerHTML = mensaje;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
}

function consultarAPI(ciudad, paisValue, paisName) {
  const apiKey = '4412d504aea13dadc32cc9ee5b92a8b2';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${paisValue}&appid=${apiKey}`;

  Spinner();

  fetch(url)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((datos) => {
      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError('Ciudad No Encontrada!');
      } else {
        mostrarClima(datos, paisName);
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function mostrarClima(datos, paisName) {
  const { name, main: { temp, temp_max, temp_min } } = datos;

  const grados = KelvinACentigrados(temp);
  const min = KelvinACentigrados(temp_max);
  const max = KelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `${name} <span class="text-warning">/</span> ${paisName}`;
  nombreCiudad.classList.add('fw-bold');

  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add('fw-bold', 'display-1', 'text-warning');

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Temp Max: <span class="fw-normal text-white">${max} &#8451</span>`;
  tempMaxima.classList.add('fw-bold', 'text-warning');

  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Temp Max: <span class="fw-normal text-white">${min} &#8451</span>`;
  tempMinima.classList.add('fw-bold', 'text-warning');

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

function KelvinACentigrados(grados) {
  return parseInt(grados - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
}