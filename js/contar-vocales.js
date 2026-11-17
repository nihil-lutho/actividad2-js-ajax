// =====================================================
// Ejercicio 4: Pedir una frase y escribir cuántas veces aparece cada vocal
// =====================================================

/** Quita acentos y pasa a minúsculas para que "á" cuente como "a" */
function quitarAcentos(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

/**
 * Devuelve un objeto con el número de apariciones de cada vocal.
 * Ejemplo: contarVocales("casa") -> { a: 2, e: 0, i: 0, o: 0, u: 0 }
 */
function contarVocales(frase) {
  const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  for (const letra of quitarAcentos(frase)) {
    if (letra in conteo) {
      conteo[letra]++;
    }
  }
  return conteo;
}

// ---- Conexión con la interfaz ----
const frase = document.getElementById("frase");
const resultado = document.getElementById("resultado");

function mostrarConteo() {
  const texto = frase.value.trim();

  if (texto === "") {
    resultado.className = "resultado aviso";
    resultado.innerHTML = "Por favor escribe una frase.";
    return;
  }

  const conteo = contarVocales(texto);
  const total = Object.values(conteo).reduce((suma, n) => suma + n, 0);

  // Se construye una tabla con una fila por vocal
  let filas = "";
  for (const vocal in conteo) {
    filas += `<tr><td>${vocal.toUpperCase()}</td><td>${conteo[vocal]}</td></tr>`;
  }

  resultado.className = total > 0 ? "resultado ok" : "resultado error";
  resultado.innerHTML =
    `<strong>Conteo de vocales en "${texto}"</strong>` +
    `<table class="conteo"><thead><tr><th>Vocal</th><th>Veces que aparece</th></tr></thead>` +
    `<tbody>${filas}</tbody>` +
    `<tfoot><tr><th>Total</th><th>${total}</th></tr></tfoot></table>`;
}

document.getElementById("btnContar").addEventListener("click", mostrarConteo);
frase.addEventListener("keydown", (e) => { if (e.key === "Enter") mostrarConteo(); });
