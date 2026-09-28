# Ferretería El Tornillo — sitio demo (portafolio)

Este proyecto es una **demo de portafolio**, pensada para mostrarle a dueños de
ferreterías de Minas (Uruguay) un ejemplo del tipo de sitio web que un
freelancer les puede desarrollar. **No es el sitio de un negocio real**: el
nombre "Ferretería El Tornillo", la dirección, el teléfono, el WhatsApp y los
horarios son todos ficticios y están marcados como ejemplo en el propio
código y en la franja superior del sitio.

## Identidad visual

Ferretería de barrio con oficio: fondo papel/kraft y grafito, acento amarillo
seguridad y naranja herramienta. Tipografía display **Anton** + **Barlow
Condensed** para títulos y etiquetas, **Barlow** para texto de lectura e
**IBM Plex Mono** para precios y códigos. Recursos propios: cinta métrica
como separador entre secciones, ticket/remito de ejemplo en el hero,
etiquetas de góndola en las ofertas e ilustraciones SVG a línea propias
(sin fotos de stock).

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`), tokens
  de color y tipografía definidos con `@theme` en `src/index.css`
- Fuentes self-hosted vía `@fontsource/*` (Anton, Barlow Condensed, Barlow,
  IBM Plex Mono) — sin depender de Google Fonts CDN
- Sin librerías de íconos externas: los íconos son SVG inline propios
  (`src/components/Iconos.tsx`)

## Estructura del código

```
src/
  config.ts              Datos de fábrica del negocio, horarios, crédito del
                          autor y FUENTE_DATOS (local o Google Sheets)
  data/
    store.tsx             DatosProvider + useDatos(): estado editable del
                          sitio (productos y datos del negocio), persistido
                          en localStorage o leído de Sheets
    contexto.ts            Tipos y contexto de React que usa store.tsx
    productos.ts            Catálogo de ejemplo (40 productos, 7 rubros)
    rubros.ts, servicios.ts, beneficios.ts, marcas.ts   Contenido fijo
  admin/                  Panel de administración (#/admin): login por PIN,
                          alta/edición/baja de productos con foto, datos
                          del negocio y horarios, copia de seguridad
  hooks/
    usePedido.ts          Carrito de "Armá tu pedido" (localStorage)
    useHashRoute.ts         Ruteo mínimo por hash, para separar #/admin
    usePaginacion.ts        Paginado genérico (usado en el catálogo)
    useEstadoHorario.ts      Abierto ahora / Cerrado, en hora de Uruguay
    useReveal.ts            Aparición al hacer scroll (IntersectionObserver)
    useNavegacionSuave.ts   Scroll suave al navegar por anclas internas
  utils/
    horario.ts             Cálculo de abierto/cerrado a partir de horarios
    whatsapp.ts             Arma el mensaje y el link de WhatsApp del pedido
    cotizacion.ts            Arma el mensaje de WhatsApp del formulario
    csv.ts                   Parser de CSV (para la fuente Sheets)
    imagen.ts                Redimensiona fotos subidas desde el panel
  components/            Un componente por sección/bloque de la página
```

## Contenido de la página

- Header con indicador en vivo de **Abierto ahora / Cerrado**, acceso directo
  a Ofertas y menú mobile
- Hero con ilustración tipo remito/ticket
- Franja destacada, editable desde el panel ("aviso del inicio")
- Índice de rubros (bulonería, electricidad, sanitaria, pinturas,
  herramientas, jardín, construcción): un solo catálogo, no listas repetidas
- "¿Por qué elegirnos?", asesoramiento técnico
- **Armá tu pedido**: catálogo único con filtro por rubro, filtro "Solo
  ofertas", buscador y paginado. Sumás productos con cantidad, el pedido se
  guarda en `localStorage` y se envía por WhatsApp con el detalle armado. Las
  ofertas de la semana son los productos marcados como oferta, no una lista
  aparte.
- Servicios, formulario "Solicitá tu cotización", horarios y ubicación con
  mapa, cinta de marcas (ficticias), contacto y footer con crédito del autor

## Panel de administración (`#/admin`)

Pensado para que el dueño del comercio cambie precios, stock, fotos y
horarios desde el celular, sin escribirle al desarrollador.

- **Acceso**: PIN de demostración `1234` (se muestra en la propia pantalla de
  login). En un sitio real, el acceso se reemplaza por una cuenta de Google
  (si se usa la fuente Sheets) o por un backend con login propio (por
  ejemplo Supabase); el PIN es solo para esta demo.
- **Productos**: lista con búsqueda, miniatura y estados (con/sin stock,
  oferta, destacado, activo/pausado); alta, edición, duplicado y borrado con
  confirmación. La foto se saca o se sube desde el formulario y se ajusta
  sola a 1200px de lado en JPEG liviano.
- **Datos del negocio**: WhatsApp, dirección, horarios por día (con más de
  una franja si hace falta) y el aviso de la franja del inicio.
- **Copia de seguridad**: descargar/cargar un JSON con todo, o volver a los
  datos de ejemplo originales.
- Todo se guarda en este navegador (clave `ferreteria.datos.v1` de
  localStorage), con aviso si el guardado falla (por ejemplo, sin espacio).

### Fuente de datos: local o Google Sheets

En `src/config.ts`, `FUENTE_DATOS` define de dónde sale el catálogo:

```ts
export const FUENTE_DATOS: FuenteDatos = { tipo: 'local' }
// o, para un cliente real:
// export const FUENTE_DATOS = { tipo: 'sheets', csvUrl: 'https://docs.google.com/.../pub?output=csv' }
```

Con `tipo: 'sheets'`, el catálogo se lee de una planilla de Google Sheets
publicada como CSV (Archivo → Compartir → Publicar en la web → formato CSV).
El panel deja de mostrar el formulario de productos y en cambio explica que
se editan en la planilla. Columnas esperadas (con encabezado en la primera
fila):

| codigo | nombre | rubro | unidad | precio | stock | oferta | precioAnterior | destacado | activo | foto |
|---|---|---|---|---|---|---|---|---|---|---|
| 1042 | Tornillo autorroscante 8x1" | bulonera | unidad | 8 | si | no | | no | si | |

`rubro` usa los mismos ids que `src/data/rubros.ts` (bulonera, electricidad,
sanitaria, pinturas, herramientas, jardin, construccion). Las columnas
`stock`, `oferta`, `destacado` y `activo` aceptan "si"/"no" (o vacío = sí,
salvo oferta y destacado que son no por defecto). El parser de CSV
(`src/utils/csv.ts`) soporta comillas y comas dentro de un campo; se prueba
con `npx ts-node --esm scripts/test-csv.ts`.

## Cómo correrlo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Cómo cambiar los datos del negocio o las fotos

- **Lo más simple**: entrar a `#/admin` (PIN `1234`) y cambiar precios, stock,
  fotos, ofertas y horarios ahí. Se guarda solo en ese navegador.
- **Valores de fábrica** (lo que se ve la primera vez, y lo que vuelve al
  restaurar el ejemplo): `src/config.ts` (negocio y horarios) y
  `src/data/productos.ts` (catálogo).
- **Rubros, servicios, beneficios, marcas**: editá los archivos en
  `src/data/` (no son editables desde el panel en esta demo).
- **Autor / crédito del footer**: editá `AUTOR` en `src/config.ts`.
- **Para un cliente real**: usar la fuente Sheets (ver arriba) para que el
  catálogo se edite en una planilla, sin depender de un solo navegador.

## Cómo deployar

- **Vercel**: importar el repositorio, framework detectado automáticamente
  como Vite (build `npm run build`, output `dist`).
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages / subcarpetas**: `vite.config.ts` ya tiene `base: './'`, así
  que el build funciona sirviéndose desde una subcarpeta.
