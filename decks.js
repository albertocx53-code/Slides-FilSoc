/* =====================================================================
   FIL&SOC SLIDES — CONTEÚDO
   Cada apresentação é um objeto. Tipos de slide:
   topicos   { titulo, itens[] }
   conceito  { termo, def, ex }
   citacao   { texto, autor, obra }
   compara   { titulo, a:{nome,itens[]}, b:{nome,itens[]} }
   tempo     { titulo, marcos:[[data, texto], ...] }
   bio       { nome, datas, itens[] }            (usa a imagem da apresentação)
   debate    { pergunta, itens[] }
   resumo    { itens[], enem }
   Todo slide aceita "n" (nota para o professor).
   A capa é montada sozinha a partir dos dados da apresentação.
   ===================================================================== */
window.DECKS = [
/* ============================ FILOSOFIA ============================ */
{
  slug: 'o-que-e-filosofia', disc: 'Filosofia', titulo: 'O que é Filosofia?', sub: 'Do mito ao logos', img: '', simbolo: 'coruja', cor: '#e3241b',
  serie: '1º ano', tema: 'Introdução',
  slides: [
    { t: 'topicos', titulo: 'Por que perguntar?', itens: ['A Filosofia começa com o espanto diante do mundo', 'Ela pergunta o que parece óbvio: o que é justo, o que é real, o que é o bem', 'Não busca só respostas: busca entender as perguntas', 'É um exercício de pensamento crítico e argumentado'], n: 'Abra com uma pergunta para a turma: por que existe algo em vez de nada? Deixe as respostas no quadro.' },
    { t: 'conceito', termo: 'Filosofia', def: 'Do grego philos (amigo, amor) e sophia (sabedoria): amor ou amizade pelo saber.', ex: 'O filósofo não é quem sabe tudo, mas quem deseja saber e por isso investiga.' },
    { t: 'compara', titulo: 'Mito e logos', a: { nome: 'Pensamento mítico', itens: ['Explica o mundo por narrativas sagradas', 'Verdade aceita pela tradição', 'Deuses e forças sobrenaturais como causa'] }, b: { nome: 'Pensamento filosófico', itens: ['Explica o mundo pela razão (logos)', 'Verdade que precisa de argumentos', 'Busca causas naturais e princípios'] }, n: 'Destaque que a passagem não foi uma ruptura total: mito e razão conviveram por muito tempo.' },
    { t: 'tempo', titulo: 'Onde e quando nasceu', marcos: [['Séc. VII a.C.', 'Cidades gregas da Jônia, como Mileto, crescem com o comércio'], ['Séc. VI a.C.', 'Tales de Mileto busca o princípio de todas as coisas'], ['Séc. V a.C.', 'Atenas: Sócrates leva a Filosofia para a praça pública'], ['Séc. IV a.C.', 'Platão e Aristóteles fundam escolas e sistematizam o saber']] },
    { t: 'topicos', titulo: 'As grandes áreas', itens: ['Metafísica: o que é a realidade?', 'Epistemologia: como podemos conhecer?', 'Ética: como devemos agir?', 'Política: como viver em sociedade?', 'Estética: o que é o belo?', 'Lógica: como argumentar corretamente?'] },
    { t: 'citacao', texto: 'Uma vida sem exame não vale a pena ser vivida.', autor: 'Sócrates', obra: 'em Platão, Apologia de Sócrates' },
    { t: 'debate', pergunta: 'A Filosofia ainda serve para alguma coisa?', itens: ['Que perguntas filosóficas aparecem no seu dia a dia?', 'A ciência substituiu a Filosofia?', 'Dá para viver sem refletir sobre a própria vida?'] },
    { t: 'resumo', itens: ['Filosofia é amor ao saber e investigação racional', 'Nasce na Grécia, na passagem do mito ao logos', 'Divide-se em áreas como ética, política e epistemologia'], enem: 'O Enem cobra a diferença entre explicação mítica e explicação racional da realidade.' }
  ]
},
{
  slug: 'pre-socraticos', disc: 'Filosofia', titulo: 'Pré-socráticos', sub: 'Em busca da arché', img: '', simbolo: 'elementos', cor: '#f1b544',
  serie: '1º ano', tema: 'Filosofia antiga',
  slides: [
    { t: 'conceito', termo: 'Arché', def: 'O princípio de todas as coisas: aquilo de que tudo vem e para onde tudo volta.', ex: 'Os primeiros filósofos queriam explicar a natureza (physis) sem recorrer aos deuses.' },
    { t: 'topicos', titulo: 'Quem foram', itens: ['Tales de Mileto: a água é o princípio de tudo', 'Anaximandro: o ápeiron, o ilimitado', 'Anaxímenes: o ar', 'Pitágoras: os números organizam o cosmos', 'Empédocles: terra, água, ar e fogo'] },
    { t: 'compara', titulo: 'Mudança ou permanência?', a: { nome: 'Heráclito', itens: ['Tudo flui, tudo muda', 'O fogo como símbolo da transformação', 'A realidade é luta e união de contrários'] }, b: { nome: 'Parmênides', itens: ['O ser é, o não ser não é', 'A mudança é ilusão dos sentidos', 'Só a razão alcança a verdade'] }, n: 'Esse é o debate mais cobrado. Peça exemplos de coisas que mudam e de coisas que parecem permanecer.' },
    { t: 'citacao', texto: 'Ninguém se banha duas vezes no mesmo rio.', autor: 'Heráclito', obra: 'fragmento' },
    { t: 'topicos', titulo: 'Os atomistas', itens: ['Leucipo e Demócrito', 'Tudo é formado por átomos e vazio', 'Átomo: partícula indivisível', 'Uma explicação mecânica da natureza, sem deuses'] },
    { t: 'debate', pergunta: 'Você é a mesma pessoa de cinco anos atrás?', itens: ['O que mudou e o que permaneceu?', 'Quem teria razão: Heráclito ou Parmênides?'] },
    { t: 'resumo', itens: ['Os pré-socráticos investigaram a natureza (physis)', 'Buscaram a arché, o princípio de tudo', 'Heráclito e Parmênides debatem mudança e permanência'], enem: 'Associe cada pensador ao seu princípio: Tales e a água, Heráclito e o devir, Demócrito e o átomo.' }
  ]
},
{
  slug: 'socrates', disc: 'Filosofia', titulo: 'Sócrates', sub: 'Conhece-te a ti mesmo', img: 'socrates', cor: '#e3241b',
  serie: '1º ano', tema: 'Filosofia antiga',
  slides: [
    { t: 'bio', nome: 'Sócrates', datas: 'c. 470 a.C. – 399 a.C.', itens: ['Viveu em Atenas e não deixou nada escrito', 'Conhecemos suas ideias por Platão e Xenofonte', 'Dialogava nas praças com cidadãos e jovens', 'Foi condenado à morte acusado de corromper a juventude'] },
    { t: 'citacao', texto: 'Só sei que nada sei.', autor: 'Sócrates', obra: 'atribuída, a partir da Apologia de Platão' },
    { t: 'conceito', termo: 'Ironia socrática', def: 'Sócrates finge não saber e faz perguntas que revelam as contradições do interlocutor.', ex: 'Quem dizia saber o que é a coragem acabava percebendo que não sabia definir.' },
    { t: 'conceito', termo: 'Maiêutica', def: 'A arte de "dar à luz" ideias: por meio de perguntas, o interlocutor descobre a verdade em si mesmo.', ex: 'O nome vem do ofício da mãe de Sócrates, que era parteira.' },
    { t: 'tempo', titulo: 'O julgamento', marcos: [['Acusação', 'Não reconhecer os deuses da cidade e corromper a juventude'], ['Defesa', 'Sócrates diz que só cumpria a missão de examinar a si e aos outros'], ['Sentença', 'Condenado, recusa fugir e bebe a cicuta em 399 a.C.']] },
    { t: 'debate', pergunta: 'Vale a pena morrer pelas próprias ideias?', itens: ['Sócrates poderia ter fugido. Por que não fugiu?', 'O que significa "conhecer a si mesmo" hoje?'] },
    { t: 'resumo', itens: ['Sócrates desloca a Filosofia da natureza para o ser humano', 'Seu método: ironia e maiêutica', 'A sabedoria começa com o reconhecimento da ignorância'], enem: 'Questões sobre Sócrates costumam explorar o diálogo como caminho para o conhecimento.' }
  ]
},
{
  slug: 'platao', disc: 'Filosofia', titulo: 'Platão', sub: 'O Mito da Caverna', img: 'platao', cor: '#e3241b',
  serie: '1º ano', tema: 'Teoria do conhecimento',
  slides: [
    { t: 'bio', nome: 'Platão', datas: 'c. 428 a.C. – 348 a.C.', itens: ['Discípulo de Sócrates, escreveu em forma de diálogos', 'Fundou a Academia, em Atenas', 'Obras: A República, O Banquete, Apologia, Fédon'] },
    { t: 'compara', titulo: 'Os dois mundos', a: { nome: 'Mundo sensível', itens: ['Percebido pelos sentidos', 'Cópias imperfeitas e mutáveis', 'Gera opinião (doxa)'] }, b: { nome: 'Mundo inteligível', itens: ['Alcançado pela razão', 'As Ideias: perfeitas e eternas', 'Gera conhecimento verdadeiro (episteme)'] } },
    { t: 'tempo', titulo: 'A alegoria da caverna', marcos: [['1', 'Prisioneiros acorrentados veem só sombras na parede'], ['2', 'Um deles se liberta e vê o fogo e os objetos'], ['3', 'Sai da caverna e, aos poucos, vê o Sol'], ['4', 'Volta para libertar os outros e é rejeitado']], n: 'Peça que a turma relacione cada etapa com algo de hoje: redes sociais, notícias falsas, preconceitos.' },
    { t: 'conceito', termo: 'Doxa e episteme', def: 'Doxa é a opinião, presa às aparências. Episteme é o conhecimento verdadeiro, alcançado pela razão.', ex: 'Quem só vê as sombras tem opinião; quem sai da caverna chega ao conhecimento.' },
    { t: 'topicos', titulo: 'O que a caverna representa', itens: ['As sombras: o senso comum e as aparências', 'A saída: o caminho da educação e da Filosofia', 'O Sol: a Ideia do Bem, fonte da verdade', 'O retorno: o dever do filósofo com a cidade'] },
    { t: 'debate', pergunta: 'Quais são as cavernas do nosso tempo?', itens: ['Os algoritmos nos mostram sombras?', 'Por que é difícil sair da própria caverna?', 'Vale a pena voltar para libertar os outros?'] },
    { t: 'resumo', itens: ['Platão separa mundo sensível e mundo das Ideias', 'A caverna mostra a passagem da opinião ao conhecimento', 'Educar é voltar o olhar para a verdade'], enem: 'A alegoria da caverna é um dos textos mais cobrados: foque em aparência x realidade.' }
  ]
},
{
  slug: 'aristoteles', disc: 'Filosofia', titulo: 'Aristóteles', sub: 'Ética, política e a busca da felicidade', img: 'aristoteles', cor: '#e3241b',
  serie: '1º ano', tema: 'Filosofia antiga',
  slides: [
    { t: 'bio', nome: 'Aristóteles', datas: '384 a.C. – 322 a.C.', itens: ['Aluno de Platão por cerca de 20 anos', 'Preceptor de Alexandre, o Grande', 'Fundou o Liceu, em Atenas', 'Escreveu sobre lógica, ética, política, biologia e poética'] },
    { t: 'compara', titulo: 'Platão e Aristóteles', a: { nome: 'Platão', itens: ['A verdade está no mundo das Ideias', 'Desconfia dos sentidos', 'Método: dialética'] }, b: { nome: 'Aristóteles', itens: ['A essência está nas próprias coisas', 'O conhecimento começa pelos sentidos', 'Método: observação e lógica'] } },
    { t: 'conceito', termo: 'Felicidade (eudaimonia)', def: 'O fim último da vida humana: viver bem, realizando o que há de melhor em nós, a razão.', ex: 'Não é um prazer passageiro, mas uma vida inteira bem vivida.' },
    { t: 'conceito', termo: 'Justo meio', def: 'A virtude está no equilíbrio entre dois extremos, o excesso e a falta.', ex: 'A coragem fica entre a covardia (falta) e a temeridade (excesso).' },
    { t: 'citacao', texto: 'O homem é, por natureza, um animal político.', autor: 'Aristóteles', obra: 'Política' },
    { t: 'debate', pergunta: 'Felicidade é ter prazer ou viver bem?', itens: ['Dê um exemplo de justo meio no seu cotidiano', 'É possível ser feliz sozinho, fora da vida em comunidade?'] },
    { t: 'resumo', itens: ['Aristóteles valoriza a experiência e a observação', 'A ética busca a felicidade pela virtude', 'A virtude é o justo meio entre extremos'], enem: 'Cobrado em ética: eudaimonia, virtude como hábito e o ser humano como animal político.' }
  ]
},
{
  slug: 'contratualistas', disc: 'Filosofia', titulo: 'Contratualistas', sub: 'Hobbes, Locke e Rousseau', img: '', simbolo: 'contrato', cor: '#e3241b',
  serie: '2º ano', tema: 'Filosofia política',
  slides: [
    { t: 'conceito', termo: 'Contrato social', def: 'Acordo hipotético em que as pessoas saem do estado de natureza e criam a sociedade política e o Estado.', ex: 'A pergunta central: por que obedecemos a um governo?' },
    { t: 'topicos', titulo: 'Thomas Hobbes (1588–1679)', itens: ['Estado de natureza: guerra de todos contra todos', 'Sem um poder comum, a vida é insegura', 'Os indivíduos entregam a liberdade a um soberano forte', 'Obra: Leviatã (1651)'] },
    { t: 'citacao', texto: 'O homem é o lobo do homem.', autor: 'Thomas Hobbes', obra: 'Do Cidadão (retomando Plauto)' },
    { t: 'topicos', titulo: 'John Locke (1632–1704)', itens: ['No estado de natureza já existem direitos naturais', 'Vida, liberdade e propriedade', 'O governo existe para proteger esses direitos', 'Se o governo os viola, o povo pode resistir'] },
    { t: 'topicos', titulo: 'Jean-Jacques Rousseau (1712–1778)', itens: ['O ser humano nasce bom; a sociedade o corrompe', 'A propriedade privada gerou a desigualdade', 'O poder legítimo vem da vontade geral', 'Obra: Do Contrato Social (1762)'] },
    { t: 'citacao', texto: 'O homem nasce livre, e por toda parte encontra-se a ferros.', autor: 'Jean-Jacques Rousseau', obra: 'Do Contrato Social' },
    { t: 'debate', pergunta: 'Quanto de liberdade você trocaria por segurança?', itens: ['Com qual dos três você concorda mais?', 'Quando o povo tem o direito de resistir a um governo?'] },
    { t: 'resumo', itens: ['Hobbes: Estado forte para garantir a paz', 'Locke: governo limitado que protege direitos naturais', 'Rousseau: soberania popular e vontade geral'], enem: 'O Enem cobra a comparação entre os três e a ideia de estado de natureza.' }
  ]
},
{
  slug: 'descartes', disc: 'Filosofia', titulo: 'Descartes', sub: 'A dúvida e o racionalismo', img: 'descartes', cor: '#e3241b',
  serie: '2º ano', tema: 'Teoria do conhecimento',
  slides: [
    { t: 'bio', nome: 'René Descartes', datas: '1596 – 1650', itens: ['Filósofo e matemático francês', 'Considerado o pai da filosofia moderna', 'Obras: Discurso do Método (1637) e Meditações (1641)'] },
    { t: 'conceito', termo: 'Dúvida metódica', def: 'Duvidar de tudo o que pode ser posto em dúvida, para encontrar uma certeza absoluta.', ex: 'Os sentidos às vezes enganam; e se eu estiver sonhando agora?' },
    { t: 'tempo', titulo: 'Os passos da dúvida', marcos: [['1', 'Os sentidos enganam'], ['2', 'Não há como ter certeza de que não estou sonhando'], ['3', 'E se um gênio maligno me enganasse até na matemática?'], ['4', 'Mesmo duvidando, eu penso: logo, existo']] },
    { t: 'citacao', texto: 'Penso, logo existo.', autor: 'René Descartes', obra: 'Discurso do Método' },
    { t: 'compara', titulo: 'Racionalismo e empirismo', a: { nome: 'Racionalismo (Descartes)', itens: ['A razão é a fonte do conhecimento seguro', 'Existem ideias inatas', 'Modelo: a matemática'] }, b: { nome: 'Empirismo (Locke, Hume)', itens: ['O conhecimento vem da experiência', 'A mente nasce como uma folha em branco', 'Modelo: a observação'] } },
    { t: 'debate', pergunta: 'Como provar que você não está sonhando agora?', itens: ['O que, em Matrix, lembra a dúvida de Descartes?', 'Existe alguma certeza que ninguém pode negar?'] },
    { t: 'resumo', itens: ['Descartes usa a dúvida como método', 'O cogito é a primeira certeza', 'Inaugura o racionalismo moderno'], enem: 'Cobrado em teoria do conhecimento: dúvida metódica e o debate com o empirismo.' }
  ]
},
{
  slug: 'kant', disc: 'Filosofia', titulo: 'Kant', sub: 'Esclarecimento e dever', img: 'kant', cor: '#e3241b',
  serie: '2º ano', tema: 'Ética',
  slides: [
    { t: 'bio', nome: 'Immanuel Kant', datas: '1724 – 1804', itens: ['Viveu toda a vida em Königsberg, na Prússia', 'Um dos maiores nomes do Iluminismo', 'Obras: Crítica da Razão Pura e Fundamentação da Metafísica dos Costumes'] },
    { t: 'citacao', texto: 'Sapere aude! Tem coragem de fazer uso do teu próprio entendimento.', autor: 'Immanuel Kant', obra: 'Resposta à pergunta: o que é o Esclarecimento? (1784)' },
    { t: 'conceito', termo: 'Esclarecimento', def: 'A saída do ser humano da menoridade, da incapacidade de pensar sem a direção de outro.', ex: 'Para Kant, a menoridade é culpa nossa quando falta coragem, não inteligência.' },
    { t: 'conceito', termo: 'Imperativo categórico', def: 'Age apenas segundo uma regra que você possa querer que se torne lei universal.', ex: 'Posso mentir para me livrar de um problema? E se todos mentissem?' },
    { t: 'topicos', titulo: 'A ética do dever', itens: ['O valor moral está na intenção, não nas consequências', 'Agir por dever, e não só conforme o dever', 'Tratar as pessoas sempre como fim, nunca apenas como meio', 'A autonomia: a razão dá a si mesma a lei moral'] },
    { t: 'debate', pergunta: 'Mentir é sempre errado?', itens: ['E para salvar uma vida?', 'O que vale mais: a intenção ou o resultado?'] },
    { t: 'resumo', itens: ['Esclarecimento é pensar por conta própria', 'A moral se baseia no dever e na razão', 'Imperativo categórico: a regra que vale para todos'], enem: 'Kant aparece em questões de ética e em textos sobre autonomia e Iluminismo.' }
  ]
},
{
  slug: 'nietzsche', disc: 'Filosofia', titulo: 'Nietzsche', sub: 'A crítica da moral', img: 'nietzsche', cor: '#e3241b',
  serie: '3º ano', tema: 'Filosofia contemporânea',
  slides: [
    { t: 'bio', nome: 'Friedrich Nietzsche', datas: '1844 – 1900', itens: ['Filósofo alemão e professor de filologia', 'Escrevia em aforismos e com estilo poético', 'Obras: Assim Falou Zaratustra, A Gaia Ciência, Genealogia da Moral'] },
    { t: 'citacao', texto: 'Deus está morto.', autor: 'Friedrich Nietzsche', obra: 'A Gaia Ciência' },
    { t: 'conceito', termo: 'Morte de Deus', def: 'O fim da crença em valores absolutos que davam sentido à cultura ocidental.', ex: 'Não é uma frase sobre religião apenas: é sobre a crise dos fundamentos da moral.' },
    { t: 'compara', titulo: 'Genealogia da moral', a: { nome: 'Moral dos senhores', itens: ['Afirma a vida e a força', 'Cria os próprios valores', '"Bom" é o nobre, o forte'] }, b: { nome: 'Moral dos escravos', itens: ['Nasce do ressentimento', 'Nega a vida e valoriza a obediência', '"Bom" é o humilde, o fraco'] } },
    { t: 'topicos', titulo: 'Conceitos-chave', itens: ['Niilismo: a perda de sentido e de valores', 'Vontade de potência: impulso de criar e se superar', 'Além-do-homem: quem cria os próprios valores', 'Eterno retorno: viver como se tudo fosse se repetir'] },
    { t: 'debate', pergunta: 'Você viveria a sua vida de novo, exatamente igual?', itens: ['De onde vêm os nossos valores?', 'É possível criar os próprios valores?'] },
    { t: 'resumo', itens: ['Nietzsche critica a moral tradicional', 'A morte de Deus abre a crise do niilismo', 'Propõe a criação de novos valores'], enem: 'Nietzsche aparece em textos sobre crítica da moral e da cultura.' }
  ]
},
{
  slug: 'existencialismo', disc: 'Filosofia', titulo: 'Existencialismo', sub: 'Sartre e o peso de ser livre', img: 'sartre2', cor: '#e3241b',
  serie: '3º ano', tema: 'Filosofia contemporânea',
  slides: [
    { t: 'bio', nome: 'Jean-Paul Sartre', datas: '1905 – 1980', itens: ['Filósofo, escritor e dramaturgo francês', 'Recusou o Nobel de Literatura em 1964', 'Companheiro de Simone de Beauvoir', 'Obras: O Ser e o Nada, O Existencialismo é um Humanismo'] },
    { t: 'conceito', termo: 'A existência precede a essência', def: 'Primeiro existimos; depois, pelas escolhas, definimos quem somos.', ex: 'Não há natureza humana pronta: cada um se faz ao longo da vida.' },
    { t: 'citacao', texto: 'O homem está condenado a ser livre.', autor: 'Jean-Paul Sartre', obra: 'O Existencialismo é um Humanismo' },
    { t: 'topicos', titulo: 'Liberdade e responsabilidade', itens: ['Somos responsáveis por tudo o que escolhemos', 'Não escolher também é uma escolha', 'Angústia: o peso de saber que somos livres', 'Má-fé: culpar os outros ou as circunstâncias para fugir da escolha'] },
    { t: 'citacao', texto: 'Ninguém nasce mulher: torna-se mulher.', autor: 'Simone de Beauvoir', obra: 'O Segundo Sexo (1949)' },
    { t: 'debate', pergunta: 'Somos totalmente livres para escolher quem somos?', itens: ['O que limita nossas escolhas?', 'Dê um exemplo de má-fé no cotidiano'] },
    { t: 'resumo', itens: ['Para Sartre, a existência precede a essência', 'Liberdade e responsabilidade andam juntas', 'Beauvoir aplica a ideia às questões de gênero'], enem: 'O Enem já cobrou Sartre (liberdade) e Beauvoir (construção social do gênero).' }
  ]
},
{
  slug: 'hannah-arendt', disc: 'Filosofia', titulo: 'Hannah Arendt', sub: 'Totalitarismo e banalidade do mal', img: 'arendt', cor: '#e3241b',
  serie: '3º ano', tema: 'Filosofia política',
  slides: [
    { t: 'bio', nome: 'Hannah Arendt', datas: '1906 – 1975', itens: ['Pensadora política alemã, de origem judaica', 'Fugiu do nazismo e viveu nos Estados Unidos', 'Obras: Origens do Totalitarismo, A Condição Humana, Eichmann em Jerusalém'] },
    { t: 'conceito', termo: 'Totalitarismo', def: 'Forma de governo que busca dominar todos os aspectos da vida, usando terror, propaganda e uma ideologia total.', ex: 'Arendt estudou o nazismo e o stalinismo como as duas grandes experiências totalitárias.' },
    { t: 'tempo', titulo: 'O caso Eichmann', marcos: [['1961', 'Adolf Eichmann, oficial nazista, é julgado em Jerusalém'], ['Cobertura', 'Arendt acompanha o julgamento para a revista The New Yorker'], ['1963', 'Publica Eichmann em Jerusalém']] },
    { t: 'conceito', termo: 'Banalidade do mal', def: 'O mal extremo pode ser praticado por pessoas comuns, que obedecem sem pensar.', ex: 'Eichmann não parecia um monstro, e sim um burocrata que "cumpria ordens".' },
    { t: 'topicos', titulo: 'Pensar como resistência', itens: ['O contrário do mal não é a bondade, é o pensamento', 'Julgar exige parar e se colocar no lugar do outro', 'A política é o espaço da ação e do diálogo entre diferentes'] },
    { t: 'debate', pergunta: '"Eu só cumpria ordens" é uma desculpa válida?', itens: ['Onde vemos a banalidade do mal hoje?', 'Quando desobedecer é um dever?'] },
    { t: 'resumo', itens: ['Arendt analisa o totalitarismo do século XX', 'A banalidade do mal nasce da ausência de pensamento', 'Pensar e julgar são atos de responsabilidade'], enem: 'Muito cobrada em questões de ética, política e direitos humanos.' }
  ]
},
/* ============================ SOCIOLOGIA ============================ */
{
  slug: 'o-que-e-sociologia', disc: 'Sociologia', titulo: 'O que é Sociologia?', sub: 'Uma ciência nascida das revoluções', img: 'revolucao', cor: '#2e7cf6',
  serie: '1º ano', tema: 'Introdução',
  slides: [
    { t: 'conceito', termo: 'Sociologia', def: 'A ciência que estuda a vida em sociedade: as relações, as instituições e as transformações sociais.', ex: 'Ela pergunta por que agimos como agimos e como a sociedade nos influencia.' },
    { t: 'tempo', titulo: 'Contexto de surgimento', marcos: [['Séc. XVIII', 'Revolução Industrial: fábricas, cidades e operários'], ['1789', 'Revolução Francesa: fim da ordem do Antigo Regime'], ['1838', 'Auguste Comte cria o termo "sociologia"'], ['Fim do séc. XIX', 'Durkheim, Weber e Marx consolidam a disciplina']] },
    { t: 'topicos', titulo: 'Por que ela surgiu', itens: ['As mudanças rápidas geraram crises e desigualdades', 'Cidades cresceram sem estrutura', 'Era preciso explicar a nova sociedade de forma científica'] },
    { t: 'conceito', termo: 'Imaginação sociológica', def: 'A capacidade de ligar problemas pessoais a questões estruturais da sociedade.', ex: 'Estar desempregado é um problema pessoal; milhões de desempregados são uma questão social. (C. Wright Mills)' },
    { t: 'compara', titulo: 'Senso comum e Sociologia', a: { nome: 'Senso comum', itens: ['Opiniões baseadas na experiência pessoal', 'Generaliza a partir de casos isolados', 'Naturaliza o que é social'] }, b: { nome: 'Sociologia', itens: ['Conhecimento com método e dados', 'Compara contextos e grupos', 'Desnaturaliza: mostra que o social foi construído'] } },
    { t: 'debate', pergunta: 'O que no seu dia a dia parece "natural" mas foi construído pela sociedade?', itens: ['Pense em horários, roupas, profissões e regras', 'Por que coisas assim mudam de um país para outro?'] },
    { t: 'resumo', itens: ['A Sociologia nasce com as revoluções industrial e francesa', 'Estuda a sociedade com método científico', 'Ajuda a desnaturalizar o que parece óbvio'], enem: 'Desnaturalização e estranhamento são palavras-chave das questões de Sociologia.' }
  ]
},
{
  slug: 'durkheim', disc: 'Sociologia', titulo: 'Émile Durkheim', sub: 'O fato social', img: '', simbolo: 'engrenagem', cor: '#2e7cf6',
  serie: '1º ano', tema: 'Clássicos da Sociologia',
  slides: [
    { t: 'topicos', titulo: 'Quem foi', itens: ['Sociólogo francês (1858–1917)', 'Um dos fundadores da Sociologia como ciência', 'Obras: As Regras do Método Sociológico, O Suicídio, Da Divisão do Trabalho Social'] },
    { t: 'citacao', texto: 'A primeira regra, e a mais fundamental, é considerar os fatos sociais como coisas.', autor: 'Émile Durkheim', obra: 'As Regras do Método Sociológico' },
    { t: 'conceito', termo: 'Fato social', def: 'Maneiras de agir, pensar e sentir que existem fora do indivíduo e se impõem a ele.', ex: 'A língua, as leis, a moda e os costumes já existiam antes de você nascer.' },
    { t: 'topicos', titulo: 'Características do fato social', itens: ['Coercitivo: exerce pressão sobre o indivíduo', 'Exterior: existe fora da consciência individual', 'Geral: vale para o conjunto do grupo'] },
    { t: 'compara', titulo: 'Solidariedade social', a: { nome: 'Mecânica', itens: ['Sociedades simples', 'Coesão pela semelhança', 'Forte consciência coletiva'] }, b: { nome: 'Orgânica', itens: ['Sociedades modernas', 'Coesão pela divisão do trabalho', 'Cada um depende do outro'] } },
    { t: 'conceito', termo: 'Anomia', def: 'Situação em que as normas sociais perdem força e os indivíduos ficam sem referências.', ex: 'Durkheim relacionou a anomia ao aumento de suicídios em períodos de crise.' },
    { t: 'resumo', itens: ['Durkheim define o objeto da Sociologia: o fato social', 'Fatos sociais são coercitivos, exteriores e gerais', 'A coesão social pode ser mecânica ou orgânica'], enem: 'Fato social e anomia aparecem com frequência no Enem.' }
  ]
},
{
  slug: 'weber', disc: 'Sociologia', titulo: 'Max Weber', sub: 'Ação social e racionalização', img: '', simbolo: 'balanca', cor: '#2e7cf6',
  serie: '1º ano', tema: 'Clássicos da Sociologia',
  slides: [
    { t: 'topicos', titulo: 'Quem foi', itens: ['Sociólogo e economista alemão (1864–1920)', 'Fundador da sociologia compreensiva', 'Obra: A Ética Protestante e o Espírito do Capitalismo (1904–1905)'] },
    { t: 'conceito', termo: 'Ação social', def: 'Toda ação orientada pelo comportamento de outras pessoas e dotada de um sentido para quem age.', ex: 'Abrir o guarda-chuva por causa da chuva não é ação social; cumprimentar alguém é.' },
    { t: 'topicos', titulo: 'Os quatro tipos de ação', itens: ['Racional com relação a fins: meios calculados para um objetivo', 'Racional com relação a valores: guiada por convicções', 'Afetiva: movida por emoções', 'Tradicional: guiada pelo costume'] },
    { t: 'topicos', titulo: 'Tipos de dominação legítima', itens: ['Tradicional: baseada no costume (reis, patriarcas)', 'Carismática: baseada no fascínio por um líder', 'Racional-legal: baseada em leis e regras impessoais'] },
    { t: 'conceito', termo: 'Desencantamento do mundo', def: 'O processo pelo qual a explicação mágica e religiosa dá lugar ao cálculo e à ciência.', ex: 'A burocracia é a forma mais típica da racionalização moderna.' },
    { t: 'debate', pergunta: 'Que tipo de ação levou você à escola hoje?', itens: ['Que líderes atuais usam a dominação carismática?', 'A burocracia ajuda ou atrapalha a vida?'] },
    { t: 'resumo', itens: ['Weber quer compreender o sentido das ações', 'Classifica ações e formas de dominação', 'A modernidade é marcada pela racionalização'], enem: 'Os tipos de dominação de Weber são muito cobrados.' }
  ]
},
{
  slug: 'karl-marx', disc: 'Sociologia', titulo: 'Karl Marx', sub: 'Trabalho, classes e capital', img: 'marx', cor: '#2e7cf6',
  serie: '2º ano', tema: 'Clássicos da Sociologia',
  slides: [
    { t: 'bio', nome: 'Karl Marx', datas: '1818 – 1883', itens: ['Filósofo, economista e sociólogo alemão', 'Escreveu o Manifesto Comunista com Friedrich Engels (1848)', 'Obra principal: O Capital (1867)'] },
    { t: 'citacao', texto: 'A história de toda sociedade até hoje é a história da luta de classes.', autor: 'Karl Marx e Friedrich Engels', obra: 'Manifesto Comunista' },
    { t: 'compara', titulo: 'As classes no capitalismo', a: { nome: 'Burguesia', itens: ['Dona dos meios de produção', 'Fábricas, máquinas, terras', 'Obtém o lucro'] }, b: { nome: 'Proletariado', itens: ['Possui apenas a força de trabalho', 'Vende seu trabalho em troca de salário', 'Produz a riqueza'] } },
    { t: 'conceito', termo: 'Mais-valia', def: 'A diferença entre o valor que o trabalhador produz e o salário que recebe.', ex: 'Se em 4 horas o trabalhador já produz o valor do seu salário, o restante da jornada gera lucro para o patrão.' },
    { t: 'conceito', termo: 'Alienação', def: 'O trabalhador não se reconhece no que produz e perde o controle sobre o próprio trabalho.', ex: 'Em Tempos Modernos, Chaplin aperta parafusos sem saber o que está sendo fabricado.' },
    { t: 'citacao', texto: 'Os filósofos apenas interpretaram o mundo de diferentes maneiras; o que importa é transformá-lo.', autor: 'Karl Marx', obra: 'Teses sobre Feuerbach' },
    { t: 'resumo', itens: ['A sociedade se organiza a partir do trabalho e da produção', 'O conflito entre classes move a história', 'Mais-valia e alienação explicam a exploração no capitalismo'], enem: 'Mais-valia, alienação e luta de classes são presença certa nas provas.' }
  ]
},
{
  slug: 'classes-e-desigualdade', disc: 'Sociologia', titulo: 'Classes sociais e desigualdade', sub: 'Por que somos desiguais?', img: 'classes', cor: '#2e7cf6',
  serie: '2º ano', tema: 'Estratificação social',
  slides: [
    { t: 'conceito', termo: 'Estratificação social', def: 'A divisão da sociedade em camadas hierarquizadas, com acesso desigual a recursos, poder e prestígio.', ex: 'Renda, escolaridade, raça e gênero influenciam a posição de cada um.' },
    { t: 'topicos', titulo: 'Formas de estratificação', itens: ['Castas: posição fixa por nascimento (Índia tradicional)', 'Estamentos: ordem baseada na honra e na lei (sociedade feudal)', 'Classes: posição ligada à economia, com alguma mobilidade'] },
    { t: 'compara', titulo: 'Duas leituras da desigualdade', a: { nome: 'Marx', itens: ['Classe definida pela posse dos meios de produção', 'Conflito entre burguesia e proletariado'] }, b: { nome: 'Weber', itens: ['Estratificação em três dimensões', 'Classe (economia), status (prestígio) e partido (poder)'] } },
    { t: 'conceito', termo: 'Mobilidade social', def: 'A possibilidade de mudar de posição na estrutura social, para cima ou para baixo.', ex: 'A educação costuma ser vista como caminho de mobilidade, mas o ponto de partida pesa muito.' },
    { t: 'topicos', titulo: 'Desigualdade no Brasil', itens: ['Um dos países mais desiguais do mundo em renda', 'Desigualdade marcada por raça, gênero e região', 'Herança de séculos de escravidão e concentração de terras'], n: 'Se quiser números atualizados, consulte o IBGE (Síntese de Indicadores Sociais) antes da aula.' },
    { t: 'debate', pergunta: 'O esforço individual basta para mudar de classe social?', itens: ['O que é meritocracia?', 'Que oportunidades dependem do lugar onde nascemos?'] },
    { t: 'resumo', itens: ['A estratificação organiza a sociedade em camadas', 'Marx e Weber explicam a desigualdade de formas diferentes', 'No Brasil, a desigualdade tem raízes históricas'], enem: 'O Enem cobra estratificação, mobilidade e desigualdade no Brasil.' }
  ]
},
{
  slug: 'industria-cultural', disc: 'Sociologia', titulo: 'Indústria cultural', sub: 'Adorno, Horkheimer e a cultura de massa', img: '', simbolo: 'tela', cor: '#2e7cf6',
  serie: '2º ano', tema: 'Cultura e sociedade',
  slides: [
    { t: 'topicos', titulo: 'A Escola de Frankfurt', itens: ['Grupo de pensadores alemães do Instituto de Pesquisa Social', 'Theodor Adorno e Max Horkheimer', 'Desenvolveram a teoria crítica da sociedade', 'Obra: Dialética do Esclarecimento (1947)'] },
    { t: 'conceito', termo: 'Indústria cultural', def: 'A produção de cultura em série, como mercadoria, para o consumo de massa.', ex: 'Filmes, músicas e programas feitos por fórmulas que já sabemos que vão vender.' },
    { t: 'topicos', titulo: 'Efeitos, segundo Adorno e Horkheimer', itens: ['Padronização: tudo parece igual', 'Passividade: o público só consome, não reflete', 'Diversão como prolongamento do trabalho', 'Reforço da ordem social existente'] },
    { t: 'compara', titulo: 'Cultura de massa em debate', a: { nome: 'Visão crítica', itens: ['Cultura vira mercadoria', 'Empobrece o pensamento', 'Adorno e Horkheimer'] }, b: { nome: 'Outras leituras', itens: ['O público também reinterpreta', 'A tecnologia pode democratizar a arte', 'Walter Benjamin e os estudos culturais'] } },
    { t: 'debate', pergunta: 'Você escolhe o que assiste, ou o algoritmo escolhe por você?', itens: ['Os streamings são a indústria cultural de hoje?', 'É possível consumir cultura de massa de forma crítica?'] },
    { t: 'resumo', itens: ['A indústria cultural transforma cultura em mercadoria', 'Gera padronização e passividade', 'Hoje, o debate inclui redes sociais e algoritmos'], enem: 'Indústria cultural é um dos temas mais frequentes de Sociologia no Enem.' }
  ]
},
{
  slug: 'bauman', disc: 'Sociologia', titulo: 'Bauman', sub: 'Modernidade líquida', img: 'modernidade', cor: '#2e7cf6',
  serie: '3º ano', tema: 'Sociologia contemporânea',
  slides: [
    { t: 'topicos', titulo: 'Quem foi', itens: ['Zygmunt Bauman (1925–2017), sociólogo polonês', 'Viveu e lecionou na Inglaterra', 'Obras: Modernidade Líquida, Amor Líquido, Vida para Consumo'] },
    { t: 'compara', titulo: 'Sólido e líquido', a: { nome: 'Modernidade sólida', itens: ['Empregos para a vida toda', 'Instituições estáveis', 'Identidades fixas'] }, b: { nome: 'Modernidade líquida', itens: ['Trabalho flexível e incerto', 'Laços frágeis e temporários', 'Identidades em constante mudança'] } },
    { t: 'conceito', termo: 'Modernidade líquida', def: 'Tempo em que as estruturas sociais se dissolvem rápido e nada mantém a forma por muito tempo.', ex: 'Como um líquido, a vida se adapta a tudo, mas não se fixa em nada.' },
    { t: 'topicos', titulo: 'Relações e consumo', itens: ['Amor líquido: relações fáceis de começar e de terminar', 'Pessoas tratadas como produtos descartáveis', 'Consumir vira forma de construir identidade', 'Insegurança e ansiedade como marcas da época'] },
    { t: 'debate', pergunta: 'As redes sociais deixam as relações mais líquidas?', itens: ['Seguir e deixar de seguir com um clique', 'O que ainda é sólido na sua vida?'] },
    { t: 'resumo', itens: ['Bauman descreve a passagem do sólido ao líquido', 'Instabilidade no trabalho, no amor e na identidade', 'O consumo ocupa o centro da vida social'], enem: 'Bauman é muito usado em textos de apoio sobre consumo e relações.' }
  ]
},
{
  slug: 'pensamento-social-brasileiro', disc: 'Sociologia', titulo: 'Pensamento social brasileiro', sub: 'Florestan Fernandes e os intérpretes do Brasil', img: 'florestan', cor: '#2e7cf6',
  serie: '3º ano', tema: 'Brasil',
  slides: [
    { t: 'topicos', titulo: 'Os intérpretes do Brasil', itens: ['Gilberto Freyre: Casa-Grande & Senzala (1933)', 'Sérgio Buarque de Holanda: Raízes do Brasil (1936)', 'Caio Prado Júnior: Formação do Brasil Contemporâneo (1942)', 'Florestan Fernandes: A Integração do Negro na Sociedade de Classes (1964)'] },
    { t: 'bio', nome: 'Florestan Fernandes', datas: '1920 – 1995', itens: ['Sociólogo paulistano, de origem pobre', 'Professor da USP e um dos fundadores da sociologia crítica no Brasil', 'Foi deputado federal constituinte'] },
    { t: 'conceito', termo: 'Mito da democracia racial', def: 'A ideia de que no Brasil não haveria racismo porque as raças conviveriam em harmonia.', ex: 'Florestan mostrou que, após a abolição, a população negra foi deixada à margem da sociedade de classes.' },
    { t: 'conceito', termo: 'Homem cordial', def: 'Para Sérgio Buarque, o brasileiro tende a misturar o público e o privado, guiado pelo afeto e pelas relações pessoais.', ex: '"Cordial" vem de coração: não significa ser educado, e sim agir pela emoção, inclusive na política.' },
    { t: 'debate', pergunta: 'O Brasil é um país racista?', itens: ['Que dados mostram desigualdades raciais hoje?', 'Por que o mito da democracia racial resiste?'] },
    { t: 'resumo', itens: ['Os intérpretes do Brasil explicam a formação do país', 'Florestan denuncia o mito da democracia racial', 'Herança escravista e desigualdade seguem atuais'], enem: 'Questões sobre racismo estrutural e formação social brasileira são frequentes.' }
  ]
}
];
