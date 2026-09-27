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
  config.ts              Datos del negocio, horarios y crédito del autor
  data/                  Contenido: rubros, productos, ofertas, servicios,
                          beneficios, marcas ficticias
  hooks/
    usePedido.ts          Carrito de "Armá tu pedido" con persistencia en
                          localStorage
    useReveal.ts           Aparición al hacer scroll (IntersectionObserver)
    useNavegacionSuave.ts  Scroll suave al navegar por anclas internas
  utils/
    horario.ts             Cálculo de "Abierto ahora / Cerrado" en hora de
                          Uruguay (America/Montevideo)
    whatsapp.ts             Arma el mensaje y el link de WhatsApp del pedido
    cotizacion.ts            Arma el mensaje de WhatsApp del formulario de
                          cotización
  components/            Un componente por sección/bloque de la página
```

## Contenido de la página

- Header con indicador en vivo de **Abierto ahora / Cerrado** y menú mobile
- Hero con ilustración tipo remito/ticket
- Franja destacada ("Desde 1994 en el centro de Minas")
- Índice de rubros (bulonería, electricidad, sanitaria, pinturas,
  herramientas, jardín, construcción), navegable
- "¿Por qué elegirnos?" — cuatro beneficios en fila
- Asesoramiento técnico con ilustración e ilustración propia
- Ofertas de la semana con precios en pesos uruguayos
- **Armá tu pedido**: sumás productos con cantidad, el pedido se guarda en
  `localStorage` y se envía por WhatsApp con el detalle armado
- Servicios: copia de llaves, corte de caños/vidrio a medida, pintura a
  medida por computadora, envíos a domicilio en Minas
- Formulario "Solicitá tu cotización" que arma un mensaje de WhatsApp
- Horarios y ubicación, con mapa de Google Maps embebido
- Cinta de marcas (ficticias) en movimiento continuo
- Contacto (email, teléfono, dirección, Instagram) y footer con crédito del
  autor

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

- **Datos generales** (nombre, dirección, teléfono, WhatsApp, horarios):
  editá `src/config.ts`.
- **Rubros, productos, ofertas, servicios, marcas**: editá los archivos en
  `src/data/`.
- **Fotos reales**: cada producto/oferta acepta un campo opcional `foto`
  (URL o import de imagen). Si está presente, mostrala en el componente
  correspondiente en lugar de (o junto a) la ilustración; si no está, se
  sigue viendo bien sin foto.
- **Autor / crédito del footer**: editá `AUTOR` en `src/config.ts`.

## Cómo deployar

- **Vercel**: importar el repositorio, framework detectado automáticamente
  como Vite (build `npm run build`, output `dist`).
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages / subcarpetas**: `vite.config.ts` ya tiene `base: './'`, así
  que el build funciona sirviéndose desde una subcarpeta.
