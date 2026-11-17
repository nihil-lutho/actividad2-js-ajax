// =====================================================
// Ejercicio AJAX: descargar una URL con XMLHttpRequest y mostrar
//   1. la URL de la propia página por defecto
//   2. el contenido de la respuesta
//   3. los estados por los que pasa la petición
//   4. las cabeceras HTTP de la respuesta
//   5. el código y texto de estado de la respuesta
// =====================================================

// ---- Referencias a los elementos de la página ----
const campoUrl   = document.getElementById("url");
const btnMostrar = document.getElementById("btnMostrar");
const zonaEstado = document.getElementById("estado");
const historial  = document.getElementById("historial");
const zonaCodigo = document.getElementById("codigo");
const codigoTexto = document.getElementById("codigoTexto");
const zonaCabeceras = document.getElementById("cabeceras");
const zonaContenido = document.getElementById("contenido");

// Nombres de los 5 valores posibles de xhr.readyState
const NOMBRES_ESTADO = {
  0: "No iniciada (UNSENT)",
  1: "Conexión abierta (OPENED)",
  2: "Cabeceras recibidas (HEADERS_RECEIVED)",
  3: "Cargando contenido (LOADING)",
  4: "Completada (DONE)"
};

// Texto de los códigos HTTP más comunes (HTTP/2 no envía statusText)
const TEXTO_CODIGO = {
  200: "OK", 201: "Created", 204: "No Content", 301: "Moved Permanently",
  302: "Found", 304: "Not Modified", 400: "Bad Request", 401: "Unauthorized",
  403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed",
  500: "Internal Server Error", 502: "Bad Gateway", 503: "Service Unavailable"
};

// ---- AJAX 1: al cargar la página, el cuadro de texto muestra la URL de la propia página ----
window.addEventListener("load", () => {
  campoUrl.value = window.location.href;
});

// ---- AJAX 3: registrar el estado de la petición "en todo momento" ----
function mostrarEstado(readyState, extra) {
  const texto = NOMBRES_ESTADO[readyState] + ` (readyState ${readyState})` + (extra ? ` · ${extra}` : "");
  zonaEstado.textContent = texto;
  zonaEstado.className = "estado-actual " +
    (readyState === 4 ? "completada" : readyState > 0 ? "cargando" : "");

  const hora = new Date().toLocaleTimeString("es", { hour12: false }) +
               "." + String(new Date().getMilliseconds()).padStart(3, "0");
  const li = document.createElement("li");
  li.textContent = `${hora} → ${texto}`;
  historial.appendChild(li);
}

// ---- AJAX 4: mostrar todas las cabeceras de la respuesta en una tabla ----
function mostrarCabeceras(xhr) {
  // getAllResponseHeaders() devuelve "nombre: valor\r\n" por cada cabecera
  const crudo = xhr.getAllResponseHeaders().trim();
  if (crudo === "") {
    zonaCabeceras.innerHTML = "<em>El servidor no expuso cabeceras (respuesta vacía o bloqueada por CORS).</em>";
    return;
  }
  const filas = crudo.split(/\r?\n/).map((linea) => {
    const pos = linea.indexOf(":");
    const nombre = linea.slice(0, pos).trim();
    const valor  = linea.slice(pos + 1).trim();
    return `<tr><td>${escapar(nombre)}</td><td>${escapar(valor)}</td></tr>`;
  });
  zonaCabeceras.innerHTML =
    `<table class="cabeceras"><thead><tr><th>Cabecera</th><th>Valor</th></tr></thead>` +
    `<tbody>${filas.join("")}</tbody></table>` +
    `<p class="ejemplos">${filas.length} cabecera(s) recibida(s).</p>`;
}

// ---- AJAX 5: mostrar el código y el texto de estado ----
function mostrarCodigo(xhr) {
  const codigo = xhr.status;
  const texto  = xhr.statusText || TEXTO_CODIGO[codigo] || "";
  if (codigo === 0) {
    zonaCodigo.textContent = "0 (sin respuesta)";
    zonaCodigo.className = "codigo-estado error";
    codigoTexto.textContent = "La petición no obtuvo respuesta: URL inválida, servidor caído o bloqueo CORS.";
    return;
  }
  zonaCodigo.textContent = `${codigo} ${texto}`;
  zonaCodigo.className = "codigo-estado " + (codigo >= 200 && codigo < 400 ? "ok" : "error");
  codigoTexto.textContent = `xhr.status = ${codigo} · xhr.statusText = "${xhr.statusText}"`;
}

// ---- AJAX 2: descargar el contenido de la URL al pulsar "Mostrar Contenidos" ----
function mostrarContenidos() {
  const url = campoUrl.value.trim();
  if (url === "") {
    alert("Escribe una URL.");
    return;
  }

  // Se limpian las zonas antes de empezar
  historial.innerHTML = "";
  zonaCabeceras.innerHTML = "<em>Esperando respuesta...</em>";
  zonaContenido.textContent = "Cargando...";
  zonaCodigo.textContent = "—";
  zonaCodigo.className = "codigo-estado";
  codigoTexto.textContent = "";
  btnMostrar.disabled = true;

  const xhr = new XMLHttpRequest();
  mostrarEstado(xhr.readyState);               // 0: No iniciada

  // Cada vez que cambia readyState se actualiza la zona de estados
  xhr.onreadystatechange = function () {
    mostrarEstado(xhr.readyState, xhr.readyState >= 2 ? `HTTP ${xhr.status}` : "");

    if (xhr.readyState === XMLHttpRequest.DONE) {
      mostrarCodigo(xhr);                      // código y texto de estado
      mostrarCabeceras(xhr);                   // cabeceras de la respuesta
      zonaContenido.textContent =              // contenido del archivo
        xhr.responseText !== "" ? xhr.responseText : "(La respuesta no tiene contenido)";
      btnMostrar.disabled = false;
    }
  };

  // Error de red (dominio inexistente, sin conexión, CORS...)
  xhr.onerror = function () {
    zonaEstado.textContent = "Error de red: no se pudo completar la petición";
    zonaEstado.className = "estado-actual error";
    zonaContenido.textContent =
      "No se pudo descargar la URL. Si es de otro dominio, el servidor debe permitir CORS.";
  };

  xhr.open("GET", url, true);                  // true = asíncrona
  xhr.send();
}

btnMostrar.addEventListener("click", mostrarContenidos);
campoUrl.addEventListener("keydown", (e) => { if (e.key === "Enter") mostrarContenidos(); });

// Botones con URLs de ejemplo
document.querySelectorAll(".ejemplos button[data-url]").forEach((b) => {
  b.addEventListener("click", () => {
    const valor = b.dataset.url;
    campoUrl.value = valor === "propia" ? window.location.href : new URL(valor, window.location.href).href;
    mostrarContenidos();
  });
});

/** Evita que el HTML devuelto por el servidor se interprete al pintar las cabeceras */
function escapar(texto) {
  return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
