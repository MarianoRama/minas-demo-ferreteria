# Ferretería El Tornillo

Demostración de portafolio para una ferretería industrial. No representa un negocio real. Presenta rubros y un formulario que prepara una consulta para copiar; no realiza compras ni confirma stock.

## Ejecutar

`npm ci` y `npm run dev`. Producción: `npm run build`.

## Contacto

Copiar .env.example como .env.local y configurar VITE_WHATSAPP_NUMBER con 598 y ocho dígitos del contacto autorizado. Sin ese dato no se habilita el envío externo. El número de ejemplo 59899000000 está bloqueado.

El texto preparado se invalida si se modifica cualquier dato del formulario. Los datos solo viven durante la sesión de la página y no se guardan ni se envían automáticamente.

## Publicación

GitHub Pages desde main, mediante .github/workflows/deploy.yml. Ruta base /minas-demo-ferreteria/. Para un dominio independiente, ajustar base y configuración. El noindex evita indexar el negocio ficticio; cambiarlo al adaptar la web a un cliente real.

Para activar el número en GitHub Actions, añadirlo como variable del repositorio e inyectarlo en el paso de compilación. No usar teléfonos personales de prueba sin autorización.
