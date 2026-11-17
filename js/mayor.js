// =====================================================
// Ejercicio 2: Pedir dos números y escribir cuál es el mayor
// =====================================================

/** Devuelve el mayor de dos números o null si son iguales */
function obtenerMayor(a, b) {
  if (a > b) return a;
  if (b > a) return b;
  return null; // son iguales
}

// ---- Conexión con la interfaz ----
const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const resultado = document.getElementById("resultado");

function comparar() {
  // Los inputs devuelven texto: se convierten a número con Number()
  const a = Number(numero1.value);
  const b = Number(numero2.value);

  // Validación: campos vacíos o valores no numéricos
  if (numero1.value.trim() === "" || numero2.value.trim() === "" || isNaN(a) || isNaN(b)) {
    resultado.className = "resultado aviso";
    resultado.innerHTML = "Debes ingresar dos números válidos.";
    return;
  }

  const mayor = obtenerMayor(a, b);

  if (mayor === null) {
    resultado.className = "resultado ok";
    resultado.innerHTML = `<strong>Los dos números son iguales (${a})</strong>`;
  } else {
    const menor = mayor === a ? b : a;
    resultado.className = "resultado ok";
    resultado.innerHTML =
      `<strong>El número mayor es ${mayor}</strong>` +
      `<small>${mayor} es mayor que ${menor}</small>`;
  }
}

document.getElementById("btnComparar").addEventListener("click", comparar);
[numero1, numero2].forEach((campo) =>
  campo.addEventListener("keydown", (e) => { if (e.key === "Enter") comparar(); })
);
