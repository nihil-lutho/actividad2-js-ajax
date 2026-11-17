# Laboratorio: Tecnologías JavaScript y AJAX

Actividad 2 de la asignatura **Desarrollo de Aplicaciones en Red** (UNIR).
Sitio estático hecho con HTML5, CSS3 y JavaScript puro.

## Contenido

| Página | Ejercicio | Script |
|---|---|---|
| `index.html` | Menú principal | — |
| `palindromo.html` | JS 1: detectar si la cadena es un palíndromo | `js/palindromo.js` |
| `mayor.html` | JS 2: pedir dos números y mostrar el mayor | `js/mayor.js` |
| `vocales.html` | JS 3: vocales que aparecen en una frase | `js/vocales.js` |
| `contar-vocales.html` | JS 4: cuántas veces aparece cada vocal | `js/contar-vocales.js` |
| `ajax.html` | AJAX 1-5: URL por defecto, contenido, estados, cabeceras y código de estado | `js/ajax.js` |

## Ejecutar en local

Los ejercicios de JavaScript funcionan abriendo `index.html` directamente.
La página AJAX necesita un servidor HTTP (los navegadores bloquean `XMLHttpRequest` sobre `file://`).
Con Node instalado, desde esta carpeta:

```
npx serve .
```

y abrir la URL que indique (normalmente http://localhost:3000).

## Publicar en GitHub Pages

1. Crear un repositorio público en GitHub llamado `actividad2-js-ajax`.
2. Desde esta carpeta:

```
git init
git add .
git commit -m "Actividad 2: ejercicios JavaScript y AJAX"
git branch -M main
git remote add origin https://github.com/nihil-lutho/actividad2-js-ajax.git
git push -u origin main
```

3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save**.
4. En uno o dos minutos la web queda en `https://nihil-lutho.github.io/actividad2-js-ajax/`.
