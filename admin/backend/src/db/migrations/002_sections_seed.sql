INSERT INTO sections (page_id, slug, title, content, order_num) VALUES

-- HOME (page_id = 1)
(1, 'hero', 'Hero Principal', '{
  "title": "Onde o Design Encontra a Alta Costura",
  "subtitle": "Criamos cadeiras, sofás e cortinados que transformam espaços comuns em ambientes de carácter único. Cada peça, uma obra de artesanato.",
  "cta_primary": "Ver os Nossos Trabalhos",
  "cta_secondary": "Pedir Orçamento",
  "label": "Atelier de Estofos & Cortinados"
}', 1),

(1, 'intro', 'Introdução / Proposta de Valor', '{
  "label": "O Nosso Atelier",
  "title": "Artesanato que Resiste ao Tempo",
  "text1": "Na Beta Atelier, cada peça nasce de um processo artesanal rigoroso. Trabalhamos com os melhores tecidos e materiais, escolhidos a dedo para garantir estética e durabilidade que atravessam gerações.",
  "text2": "Da primeira consulta ao acabamento final, acompanhamos cada detalhe do vosso projecto. O resultado? Espaços com personalidade, conforto e uma qualidade que se vê — e se sente.",
  "cta": "Conhecer o Atelier",
  "stat1_value": "+15 Anos", "stat1_label": "de Experiência",
  "stat2_value": "+500 Peças", "stat2_label": "Entregues",
  "stat3_value": "100%", "stat3_label": "Feito à Mão"
}', 2),

(1, 'cta_final', 'CTA Final', '{
  "label": "Pronto para começar?",
  "title": "O Seu Projecto Merece o Melhor Acabamento",
  "text": "Fale connosco hoje. Descrevemos as suas necessidades, apresentamos opções e criamos a peça perfeita para o seu espaço. Sem compromisso, com toda a atenção que merece."
}', 8),

-- CADEIRAS (page_id = 2)
(2, 'hero', 'Hero Cadeiras', '{
  "title": "Cadeiras",
  "subtitle": "Artesanato que se sente ao primeiro toque",
  "label": "Cadeiras & Estofos"
}', 1),

(2, 'intro', 'Introdução Cadeiras', '{
  "label": "O Nosso Trabalho",
  "title": "Estofos Que Definem o Seu Espaço",
  "text1": "Cada cadeira que sai do nosso atelier é o resultado de um processo cuidadoso: escolha do tecido, preparação da estrutura, estofo e acabamento final.",
  "text2": "Seja uma cadeira de sala clássica, uma peça de escritório de alto padrão ou um conjunto para sala de jantar, o nosso processo garante que cada detalhe corresponde ao que imaginou."
}', 2),

(2, 'processo', 'Processo de Trabalho', '{
  "label": "Como Trabalhamos",
  "title": "Do Projecto ao Acabamento",
  "step1_title": "Consulta Inicial",
  "step1_text": "Ouvimos as suas necessidades, vemos o espaço e discutimos materiais, cores e estilo.",
  "step2_title": "Selecção de Materiais",
  "step2_text": "Apresentamos opções de tecidos, cores e acabamentos adequados ao seu projecto e orçamento.",
  "step3_title": "Produção Artesanal",
  "step3_text": "Cada peça é trabalhada manualmente no nosso atelier, com rigor e atenção a cada detalhe.",
  "step4_title": "Entrega e Instalação",
  "step4_text": "A peça é entregue e instalada no seu espaço, exactamente como imaginou."
}', 3),

-- CORTINADOS (page_id = 3)
(3, 'hero', 'Hero Cortinados', '{
  "title": "Cortinados",
  "subtitle": "A moldura perfeita para cada janela, cada luz, cada espaço"
}', 1),

(3, 'intro', 'Introdução Cortinados', '{
  "label": "Cortinados",
  "title": "Luz e Privacidade com Elegância",
  "text1": "Os cortinados são muito mais do que um acessório decorativo — são o elemento que controla a luz, define a privacidade e enquadra cada divisão.",
  "text2": "Trabalhamos com tecidos de qualidade superior, desde o linho natural ao veludo, passando por opções blackout de alto desempenho."
}', 2),

-- PULPITOS (page_id = 4)
(4, 'hero', 'Hero Púlpitos', '{
  "title": "Púlpitos",
  "subtitle": "Dignidade e qualidade para os espaços que elevam o espírito"
}', 1),

(4, 'intro', 'Introdução Púlpitos', '{
  "label": "Trabalho Especializado",
  "title": "O Respeito pelo Espaço Sagrado em Cada Detalhe",
  "text1": "O trabalho em espaços litúrgicos exige sensibilidade, experiência e um profundo respeito pela função e pela estética de cada ambiente.",
  "text2": "Cada projecto litúrgico é tratado com uma abordagem personalizada: avaliamos o espaço, a história da peça e as necessidades da comunidade."
}', 2),

-- RESTAURO (page_id = 5)
(5, 'hero', 'Hero Restauro', '{
  "title": "Restauro",
  "subtitle": "Devolvemos a vida ao que o tempo foi apagando"
}', 1),

(5, 'intro', 'Introdução Restauro', '{
  "label": "O Que Fazemos",
  "title": "Restaurar é um Acto de Respeito",
  "text1": "Restaurar uma peça de mobiliário é muito mais do que repará-la. É reconhecer o valor do que foi feito com cuidado no passado e dar-lhe as condições para continuar a contar a sua história.",
  "text2": "Trabalhamos com sofás, cadeiras, poltronas e mobiliário litúrgico. Cada restauro começa por uma avaliação honesta da peça."
}', 2),

-- SOBRE (page_id = 6)
(6, 'hero', 'Hero Sobre Nós', '{
  "title": "Sobre Nós",
  "subtitle": "Uma história feita de tecidos, dedicação e amor pelo detalhe"
}', 1),

(6, 'historia', 'História do Atelier', '{
  "label": "A Nossa História",
  "title": "Nascemos da Paixão pelo Artesanato",
  "text1": "A Beta Atelier nasceu da convicção de que o artesanato de qualidade não tem substituto. Com mais de 15 anos de experiência em estofos e cortinados, construímos uma reputação assente na honestidade e na qualidade.",
  "text2": "Estamos localizados em Recardães, Águeda, e trabalhamos para clientes particulares e empresas em toda a região."
}', 2),

-- CONTACTO (page_id = 7)
(7, 'hero', 'Hero Contacto', '{
  "title": "Contacto",
  "subtitle": "Estamos prontos para ouvir o seu projecto"
}', 1),

(7, 'info', 'Informações de Contacto', '{
  "label": "Informações de Contacto",
  "horario": "Segunda a Sexta: 9h00 — 18h00\nSábado: 9h00 — 13h00"
}', 2)

ON CONFLICT (page_id, slug) DO NOTHING;
