import ScrollReveal from '../components/ui/ScrollReveal'
import GoldDivider from '../components/ui/GoldDivider'

const sections = [
  {
    title: '1. Identificação',
    paragraphs: [
      'Este site é operado por Beta Atelier, com sede em Rua Viela do Ribeiro, 3750-720, Recardães, Águeda, Portugal.',
      'Contacto: elisabetearede67@gmail.com.',
    ],
  },
  {
    title: '2. Aceitação dos Termos',
    paragraphs: [
      'O acesso e utilização deste site implica a aceitação plena destes Termos de Uso.',
      'Caso não concorde com alguma das condições, pedimos que não utilize o site.',
    ],
  },
  {
    title: '3. Propriedade Intelectual',
    paragraphs: [
      'Todo o conteúdo deste site - textos, imagens, logotipos, design e código - é propriedade da Beta Atelier ou utilizado com autorização dos respectivos titulares.',
      'É proibida a reprodução, distribuição ou utilização comercial sem autorização prévia e escrita.',
    ],
  },
  {
    title: '4. Utilização do Site',
    paragraphs: [
      'O utilizador compromete-se a utilizar este site de forma lícita, não realizando actos que possam danificar, sobrecarregar ou prejudicar o funcionamento do site ou os direitos de terceiros.',
    ],
  },
  {
    title: '5. Pedidos de Orçamento e Comunicações',
    paragraphs: [
      'Os pedidos de orçamento submetidos através do formulário ou do WhatsApp não constituem um contrato vinculativo.',
      'Cada proposta é elaborada individualmente e enviada por email ou WhatsApp após análise do pedido.',
    ],
  },
  {
    title: '6. Limitação de Responsabilidade',
    paragraphs: [
      'A Beta Atelier não se responsabiliza por danos diretos ou indiretos resultantes da utilização ou incapacidade de utilização deste site, interrupções de serviço ou imprecisões no conteúdo, na máxima medida permitida pela lei aplicável.',
    ],
  },
  {
    title: '7. Links Externos',
    paragraphs: [
      'Este site pode conter links para sites de terceiros.',
      'A Beta Atelier não é responsável pelo conteúdo, políticas de privacidade ou práticas desses sites.',
    ],
  },
  {
    title: '8. Lei Aplicável e Foro',
    paragraphs: [
      'Estes termos são regidos pela lei portuguesa.',
      'Para a resolução de litígios, é competente o tribunal da comarca de Aveiro, sem prejuízo do disposto na legislação de defesa do consumidor.',
    ],
  },
  {
    title: '9. Resolução Alternativa de Litígios',
    paragraphs: [
      'Em caso de litígio de consumo, o utilizador pode recorrer a entidades de resolução alternativa de litígios registadas em Portugal (www.consumidor.gov.pt).',
    ],
  },
  {
    title: '10. Alterações',
    paragraphs: [
      'Estes termos podem ser atualizados a qualquer momento.',
      'A versão em vigor é sempre a publicada neste site.',
    ],
  },
]

export default function TermosUso() {
  return (
    <main className="bg-dark text-offwhite min-h-screen" style={{ paddingTop: '140px', paddingBottom: '120px' }}>
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: '780px' }}>
        <header className="mb-12">
          <h1
            className="font-serif text-offwhite"
            style={{ fontSize: '48px', lineHeight: 1.05, marginBottom: '14px' }}
          >
            Termos de Uso
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
