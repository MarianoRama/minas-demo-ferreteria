# Ferretería El Tornillo — sitio demo (portafolio)

Este proyecto es una **demo de portafolio**, pensada para mostrarle a dueños de
ferreterías de Minas (Uruguay) un ejemplo del tipo de sitio web que un
freelancer les puede desarrollar. **No es el sitio de un negocio real**: el
nombre "Ferretería El Tornillo", la dirección, el teléfono, el WhatsApp y los
horarios son todos ficticios y están marcados como ejemplo en el propio
código.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`)
- Sin librerías de íconos externas: los íconos son SVG inline

## Contenido

Landing page de una sola página (single-page, con anclas) con:

- Header con menú de anclas (Inicio, Productos, Nosotros, Contacto)
- Hero con ilustración en SVG y llamado a la acción
- Sección de rubros (herramientas, materiales de construcción, pintura,
  electricidad, plomería, jardín)
- Sección "Nosotros"
- Horarios de atención y mapa de Google Maps embebido (búsqueda genérica de
  "Minas, Uruguay", sin dirección real)
- Botón flotante de WhatsApp (número de ejemplo)
- Footer con datos de contacto ficticios

## Cómo correrlo

```bash
npm install
npm run dev
```

Para generar el build de producción:

```bash
npm run build
```
