# Revista digital interactiva: Educación Inclusiva

Proyecto estático preparado para GitHub Pages. El PDF de Canva se dividió en 18 páginas verticales (dos por cada página horizontal del PDF).

## Archivos
- `index.html`: página web.
- `style.css`: diseño adaptable.
- `script.js`: navegación y efecto de pasar página.
- `assets/pages/`: 18 páginas exportadas como imágenes.
- `assets/tiktok.mp4`: coloca aquí el video descargado de TikTok (no incluido en este paquete).

## Agregar el video
1. Descarga el TikTok que tienes permiso de usar.
2. Renómbralo exactamente `tiktok.mp4`.
3. Colócalo dentro de la carpeta `assets/`.
4. Vuelve a subir el archivo a GitHub. El reproductor aparecerá en la página 12.

El enlace original se mantiene en la cabecera de la revista.

## Publicar con GitHub Pages
1. Crea un repositorio público en GitHub, por ejemplo `revista-educacion-inclusiva`.
2. Descomprime el ZIP y sube el contenido de esta carpeta al nivel raíz del repositorio (deben quedar `index.html`, `style.css`, `script.js` y `assets/` en la raíz).
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
6. Espera a que GitHub Pages publique el sitio. La URL aparecerá en esa misma sección.

## Nota
El lector carga la librería PageFlip desde jsDelivr y las tipografías desde Google Fonts; se requiere conexión a internet para esos recursos externos.
