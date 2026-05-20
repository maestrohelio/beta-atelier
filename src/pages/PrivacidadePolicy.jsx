import ScrollReveal from '../components/ui/ScrollReveal'
import GoldDivider from '../components/ui/GoldDivider'

const sections = [
  {
    title: '1. Identificação do Responsável pelo Tratamento',
    paragraphs: [
      'Responsável: Beta Atelier (atividade individual).',
      'Morada: Rua Viela do Ribeiro, 3750-720, Recardães, Águeda.',
      'Email: elisabetearede67@gmail.com.',
      'Telefone: +351 914 888 808.',
    ],
  },
  {
    title: '2. Dados Recolhidos',
    paragraphs: [
      'Através do formulário de contacto do site, recolhemos: nome completo, endereço de email, assunto e mensagem submetida.',
      'Não recolhemos dados de pagamento, dados sensíveis nem dados de menores.',
    ],
  },
  {
    title: '3. Finalidade do Tratamento',
    paragraphs: [
      'Os dados recolhidos são utilizados exclusivamente para responder aos pedidos de contacto e orçamento submetidos pelo utilizador.',
      'Não são utilizados para fins comerciais, marketing direto ou partilhados com terceiros sem consentimento expresso, exceto quando exigido por lei.',
    ],
  },
  {
    title: '4. Base Legal do Tratamento',
    paragraphs: [
      'O tratamento baseia-se no consentimento do titular dos dados (artigo 6.o, n.o 1, alínea a) do RGPD), manifestado pelo preenchimento e envio voluntário do formulário de contacto.',
    ],
  },
  {
    title: '5. Conservação dos Dados',
    paragraphs: [
      'Os dados são conservados pelo período estritamente necessário para responder ao pedido.',
      'Após a resolução do contacto, os dados podem ser conservados por um período máximo de 1 ano para efeitos de histórico de comunicação, sendo posteriormente eliminados.',
    ],
  },
  {
    title: '6. Direitos do Titular',
    paragraphs: [
      'Nos termos do RGPD, o titular tem direito a acesso aos seus dados, retificação, apagamento ("direito a ser esquecido"), limitação do tratamento, portabilidade e oposição.',
      'Para exercer qualquer destes direitos, contacte: elisabetearede67@gmail.com.',
      'Tem ainda o direito de apresentar reclamação à autoridade de controlo nacional: CNPD - Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    ],
  },
  {
    title: '7. Segurança dos Dados',
    paragraphs: [
      'Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.',
    ],
  },
  {
    title: '8. Cookies',
    paragraphs: [
      'Este site pode utilizar cookies técnicos essenciais para o funcionamento correto das páginas.',
      'Não utilizamos cookies de rastreamento ou publicidade de terceiros.',
    ],
  },
  {
    title: '9. Alterações a Esta Política',
    paragraphs: [
      'Reservamo-nos o direito de atualizar esta política a qualquer momento.',
      'A data de última atualização será sempre indicada no topo desta página.',
    ],
  },
  {
    title: '10. Contacto',
    paragraphs: [
      'Para qualquer questão relacionada com privacidade: elisabetearede67@gmail.com.',
    ],
  },
]

export default function PrivacidadePolicy() {
  return (
    <main className="bg-dark text-offwhite min-h-screen" style={{ paddingTop: '140px', paddingBottom: '120px' }}>
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: '780px' }}>
        <header className="mb-12">
          <h1
            className="font-serif text-offwhite"
            style={{ fontSize: '48px', lineHeight: 1.05, marginBottom: '14px' }}
          >
            Política de Privacidade
          </h1>
          <p
            className="font-sans"
            style={{ fontSize: '13px', color: 'rgb(146,146,146)', marginBottom: '20px' }}
          >
            Última atualização: Janeiro de 2025
          </p>
          <GoldDivider className="max-w-[220px]" />
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <ScrollReveal key={section.title} variant="fadeUp">
              <section>
                <h2
                  className="font-serif text-offwhite"
                  style={{ fontSize: '28px', lineHeight: 1.2, marginBottom: '16px' }}
                >
                  {section.title}
                </h2>
                <h3
                  className="font-sans uppercase tracking-widest"
                  style={{ fontSize: '16px', color: 'rgb(181,172,151)', marginBottom: '10px' }}
                >
                  Informação
                </h3>
                <div className="space-y-4" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: 1.8, color: 'rgb(200,200,200)' }}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
