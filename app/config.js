require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];


module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  app: {
    title: 'marco comparato :: design and technology and you and me',
    description: 'Experience More lets you draw and create a new video with Tom Brady',
    head: {
      titleTemplate: '#marcocomparato: %s',
      meta: [
        {name: 'description', content: 'lorem ipsum dolor sit amet.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Marco Comparato'},
        {property: 'og:title', content: 'Portfolio'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:description', content: 'Marco Comparato Design and Development'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@marcocomparato'},
        {property: 'og:creator', content: '@marcocomparato'},
      ]
    }
  },
  api: {
    user: environment.isProduction ?
    'https://cnlss9zahk.execute-api.us-west-2.amazonaws.com/prod/user' :
    'https://cnlss9zahk.execute-api.us-west-2.amazonaws.com/dev/user',
    frames: environment.isProduction ?
    'http://development.nkrbk8fmmp.us-west-2.elasticbeanstalk.com' :
    'http://localhost:3004',
    submissions: environment.isProduction ?
    'http://development.nkrbk8fmmp.us-west-2.elasticbeanstalk.com' :
    'http://localhost:3004',
  },
  uploadBuckets: {
    submissions: 'submissions-source-dev',
  },
}, environment);
