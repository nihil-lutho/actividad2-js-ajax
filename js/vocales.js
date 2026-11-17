// =====================================================
// Ejercicio 3: Pedir una frase y escribir las vocales que aparecen
// =====================================================

const VOCALES = ["a", "e", "i", "o", "u"];

/** Quita acentos y pasa a minúsculas: "Murciélago" -> "murcielago" */
function quitarAcentos(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

/**
 * Devuelve un array con las vocales que aparecen en la frase,
 * sin repetir y en el orden en que aparecen.
 */
function vocalesQueAparecen(frase) {
  const encontradas = [];
  for (const letra of quitarAcentos(frase)) {
    if (VOCALES.includes(letra) && !encontradas.includes(letra)) {
      encontradas.push(letra);
    }
  }
  return encontradas;
}

// ---- Conexión con la interfaz ----
const frase = document.getElementById("frase");
const resultado = document.getElementById("resultado");

function mostrarVocales() {
  const texto = frase.value.trim();

  if (texto === "") {
    resultado.className = "resultado aviso";
    resultado.innerHTML = "Por favor escribe una frase.";
    return;
  }

  const vocales = vocalesQueAparecen(texto);

  if (vocales.length === 0) {
    resultado.className = "resultado error";
    resultado.innerHTML = `<strong>La frase "${texto}" no contiene vocales</strong>`;
    return;
  }

  const chips = vocales.map((v) => `<span class="chip">${v.toUpperCase()}</span>`).join("");
  resultado.className = "resultado ok";
  resultado.innerHTML =
    `<strong>Vocales que aparecen en "${texto}":</strong>` +
    `<div class="chips">${chips}</div>` +
    `<small>${vocales.length} vocal(es) distinta(s): ${vocales.join(", ")}</small>`;
}

document.getElementById("btnBuscar").addEventListener("click", mostrarVocales);
frase.addEventListener("keydown", (e) => { if (e.key === "Enter") mostrarVocales(); });
