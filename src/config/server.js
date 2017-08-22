import config from 'lego-starter-kit/config/server';
export default config.extend({
  client: require('./client').default, // eslint-disable-line
  remoteConfig: true,
  port: process.env.PORT || 8080,
  url: process.env.URL || 'http://localhost:3000',
  db: {
    uri: process.env.DB || 'mongodb://lsk-example1:lsk-example1-pass@publicdb.mgbeta.ru:27000/lsk-example1',
  },
  jwt: {
    secret: 'REPLACE_ME_PLEASE',
  },
  auth: {
    socials: require('./socials.js'),
  },
  mailer: {
    transport: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'lsk@mgbeta.ru',
        pass: 'DqPDBbPBlz5A8zwb2M',
      },
    },
    options: {
      from: '"lego-starter-kit!" <lsk@mgbeta.ru>',
      subject: 'lego-starter-kit',
    },
  },
  ws: {},
  upload: {
    // @TODO: @andruxa externalPath (absolute)
    path: 'storage',
    // exteralPath: '/storage',
    allowGuest: false,
    // allowSetFilename: true,
    maxSize: '50mb',
    // prefix: 'file_',
    // postfix: '',
    // formats: ['png', 'jpg', 'jpeg', 'gif'],
    mimetypes: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
  },
  rating: {
    types: [
      'like', // Или лайк или ничего
      'block', // block
      'rating', // Оценка 1 - 10
      'view', // Просмотр
      'follow', // Просмотр
    ],
    subjects: {
      Post: {
        // type: 'like',
        type: 'likeDislike',
      },
      User: {
        type: 'like',
      },
      Profile: {
        type: 'rating',
        values: {
          min: 1,
          max: 10,
        },
      },
    },
  },
  notification: {

  },
})
.extendEnv();
