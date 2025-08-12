require('dotenv').config();
const mongoose = require('mongoose');
const Page = require('./server/models/Page');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/investidor360';

const initialPages = [
  {
    key: 'home',
    title: 'Home',
    sections: [
      { slug: 'welcome', title: 'Bem-vindo', content: '<p>Aprenda a investir de forma simples e segura.</p>', order: 0 },
      { slug: 'intro', title: 'Comece por Aqui', content: '<ul><li>O que é investir</li><li>Perfil de investidor</li><li>Erros comuns</li></ul>', order: 1 }
    ]
  },
  {
    key: 'renda-fixa',
    title: 'Renda Fixa',
    sections: [
      { slug: 'tesouro', title: 'Tesouro Direto', content: '<p>Guia sobre Tesouro Selic, IPCA+ e Prefixado.</p>', order: 0 },
      { slug: 'cdb-lci', title: 'CDB, LCI, LCA', content: '<p>Rendimentos, riscos e garantias.</p>', order: 1 }
    ]
  },
  {
    key: 'renda-variavel',
    title: 'Renda Variável',
    sections: [
      { slug: 'acoes', title: 'Ações', content: '<p>Como analisar e investir em ações.</p>', order: 0 },
      { slug: 'fiis', title: 'FIIs', content: '<p>Tipos de fundos imobiliários e como investir.</p>', order: 1 }
    ]
  },
  {
    key: 'exterior',
    title: 'Investimentos no Exterior',
    sections: [
      { slug: 'stocks', title: 'Stocks', content: '<p>O que são ações internacionais e como investir.</p>', order: 0 },
      { slug: 'reits', title: 'REITs', content: '<p>Semelhantes aos FIIs, mas nos EUA.</p>', order: 1 }
    ]
  },
  {
    key: 'bitcoin',
    title: 'Bitcoin',
    sections: [
      { slug: 'intro', title: 'O que é Bitcoin', content: '<p>Criptomoeda descentralizada e reserva de valor.</p>', order: 0 },
      { slug: 'seguranca', title: 'Como comprar com segurança', content: '<p>Usando corretoras confiáveis e carteiras.</p>', order: 1 }
    ]
  }
];

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB conectado');

    await Page.deleteMany({});
    console.log('Coleção limpa');

    await Page.insertMany(initialPages);
    console.log('Conteúdo inicial inserido');

    mongoose.disconnect();
    console.log('Conexão encerrada');
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
})();
