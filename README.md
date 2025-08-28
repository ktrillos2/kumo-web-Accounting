# kumo-web-Accounting

Sitio Next.js con Sanity Studio embebido en `/admin`.

## Configuración de entorno

Crea un archivo `.env.local` usando `.env.local.example` como referencia. Debes definir:

- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- (opcional) NEXT_PUBLIC_SANITY_API_VERSION
- SANITY_WRITE_TOKEN (solo para ejecutar los scripts de seed)

## Sembrar datos iniciales

Con las variables configuradas, puedes poblar "Información general" ejecutando:

```
pnpm run seed:general
```

El script sube un logo desde `public/logo.png` si existe, o usa placeholders, y crea/actualiza el documento singleton `general-settings-singleton` del tipo `generalSettings`.
