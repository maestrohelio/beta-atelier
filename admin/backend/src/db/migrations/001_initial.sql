-- 001_initial.sql
-- Cria a base de dados (executar manualmente antes da migration)
-- createdb beta_atelier_admin

CREATE TABLE IF NOT EXISTS admin_users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  name       VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id         SERIAL PRIMARY KEY,
  key        VARCHAR(255) UNIQUE NOT NULL,
  value      TEXT,
  label      VARCHAR(255),
  type       VARCHAR(50) DEFAULT 'text',
  group_name VARCHAR(100) DEFAULT 'geral',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pages (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(255) UNIQUE NOT NULL,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sections (
  id         SERIAL PRIMARY KEY,
  page_id    INTEGER REFERENCES pages(id) ON DELETE CASCADE,
  slug       VARCHAR(255) NOT NULL,
  title      VARCHAR(255),
  content    JSONB DEFAULT '{}',
  order_num  INTEGER DEFAULT 0,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(page_id, slug)
);

CREATE TABLE IF NOT EXISTS media (
  id            SERIAL PRIMARY KEY,
  filename      VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  mime_type     VARCHAR(100),
  size_bytes    INTEGER,
  url           VARCHAR(500),
  alt_text      VARCHAR(255),
  category      VARCHAR(100),
  tags          TEXT[],
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Dados iniciais: configuracoes do site
INSERT INTO site_settings (key, value, label, type, group_name) VALUES
  ('site_name',       'Beta Atelier',                              'Nome do Site',       'text',  'geral'),
  ('site_tagline',    'Onde o Design Encontra a Alta Costura',     'Tagline',            'text',  'geral'),
  ('contact_phone',   '+351 914 888 808',                          'Telefone',           'text',  'contacto'),
  ('contact_email',   'elisabetearede67@gmail.com',                'Email',              'email', 'contacto'),
  ('contact_address', 'Rua Viela do Ribeiro, 3750-720, Recardães, Águeda', 'Morada', 'text', 'contacto'),
  ('contact_maps',    'https://maps.app.goo.gl/VRfNEGYPSL2VAMjm8', 'Link Google Maps',   'url',   'contacto'),
  ('whatsapp_number', '351914888808',                              'Número WhatsApp',    'text',  'contacto'),
  ('resend_to_email', 'elisabetearede67@gmail.com',                'Email destino (formulário)', 'email', 'email')
ON CONFLICT (key) DO NOTHING;

-- Dados iniciais: paginas
INSERT INTO pages (slug, title, description) VALUES
  ('home',       'Página Principal', 'Página inicial do site'),
  ('cadeiras',   'Cadeiras',         'Página de cadeiras e estofos'),
  ('cortinados', 'Cortinados',       'Página de cortinados'),
  ('pulpitos',   'Púlpitos',         'Página de púlpitos litúrgicos'),
  ('restauro',   'Restauro',         'Página de restauro'),
  ('sobre',      'Sobre Nós',        'Página sobre o atelier'),
  ('contato',    'Contacto',         'Página de contacto')
ON CONFLICT (slug) DO NOTHING;
