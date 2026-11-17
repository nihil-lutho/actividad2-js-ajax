// =====================================================
// Ejercicio 1: Detectar si la cadena de entrada es un palíndromo
// =====================================================

/**
 * Normaliza la cadena para poder compararla:
 *  - pasa a minúsculas
 *  - elimina acentos (á -> a) usando la descomposición Unicode NFD
 *  - elimina todo lo que no sea letra o número (espacios, comas, signos...)
 */
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // quita las marcas de acento
    .replace(/[^a-z0-9ñ]/g, "");       // deja solo letras y números
}

/** Devuelve true si la cadena se lee igual de izquierda a derecha que al revés */
function esPalindromo(texto) {
  const limpia = normalizar(texto);
  const invertida = limpia.split("").reverse().join("");
  return limpia.length > 0 && limpia === invertida;
}

// ---- Conexión con la interfaz ----
const cadena = document.getElementById("cadena");
const resultado = document.getElementById("resultado");

function verificar() {
  const texto = cadena.value.trim();

  if (texto === "") {
    resultado.className = "resultado aviso";
    resultado.innerHTML = "Por favor escribe una palabra o frase.";
    return;
  }

  const limpia = normalizar(texto);
  const invertida = limpia.split("").reverse().join("");

  if (esPalindromo(texto)) {
    resultado.className = "resultado ok";
    resultado.innerHTML =
      `<strong>"${texto}" SÍ es un palíndromo</strong>` +
      `<small>Cadena normalizada: ${limpia} · Invertida: ${invertida}</small>`;
  } else {
    resultado.className = "resultado error";
    resultado.innerHTML =
      `<strong>"${texto}" NO es un palíndromo</strong>` +
      `<small>Cadena normalizada: ${limpia} · Invertida: ${invertida}</small>`;
  }
}

document.getElementById("btnVerificar").addEventListener("click", verificar);
cadena.addEventListener("keydown", (e) => { if (e.key === "Enter") verificar(); });
