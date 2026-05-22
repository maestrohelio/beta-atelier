# Beta Atelier - Guia de Configuracao

## Variaveis de Ambiente

Copia o `.env.example` para `.env` e preenche os valores:

- `VITE_SUPABASE_URL` - URL do projecto Supabase (Settings > API > Project URL)
- `VITE_SUPABASE_ANON_KEY` - Chave anonima publica Supabase (Settings > API > anon public key)
- `VITE_ADMIN_API_BASE` - URL do painel admin (default: `http://localhost:8000`)

## Como obter as credenciais Supabase

1. Acede a https://supabase.com/dashboard
2. Selecciona o teu projecto
3. Vai a **Settings > API**
4. Copia **Project URL** e **anon public key**
5. Substitui os placeholders no `.env`

## Deploy da Edge Function de Email

Prerequisitos: Supabase CLI instalado (`npm install -g supabase`)

1. `supabase login`
2. `supabase link --project-ref SEU_PROJECT_REF`
3. `supabase secrets set RESEND_API_KEY=re_f1KJXw8F_DkGm8dM1941NH81XKg3S7mwE`
4. `supabase functions deploy send-contact-email`

## Teste local da Edge Function (opcional)

1. Criar `.env.local` na raiz com:

```bash
RESEND_API_KEY=re_f1KJXw8F_DkGm8dM1941NH81XKg3S7mwE
```

2. Executar:

```bash
supabase functions serve send-contact-email --env-file .env.local
```

## Iniciar o projecto localmente

```bash
npm install
npm run dev
```

## Build para producao

```bash
npm run build
npm run preview
```

## Configurar Volume para Uploads na Railway

1. Vai a Railway > servico backend-beta-atelier > Settings
2. Clica em "Add Volume"
3. Mount path: /app/uploads
4. Guarda e faz redeploy
5. Apos o redeploy, executa localmente:

```bash
cd admin/backend
node src/db/migrate_images_to_production.js
```
