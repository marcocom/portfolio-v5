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
    title: '#ExperienceMore',
    description: 'Experience More lets you draw and create a new video with Tom Brady',
    head: {
      titleTemplate: '#ExperienceMore: %s',
      meta: [
        {name: 'description', content: 'Experience More lets you draw and create a new video with Tom Brady'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Intel: #ExperienceMore'},
        {property: 'og:title', content: 'Intel: #ExperienceMore'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:description', content: 'Experience More lets you draw and create a new video with Tom Brady'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@intel'},
        {property: 'og:creator', content: '@intel'},
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
