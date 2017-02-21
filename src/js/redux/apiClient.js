import superagent from 'superagent';
import config from 'config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(service, path = '/') {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `${config.api[service]}${adjustedPath}`;
}

class ApiClient {
  constructor() {
    methods.forEach(method => {
      this[method] = ({service, path, headers, params, data} = {}) =>
        new Promise((resolve, reject) => {
          if (config.isProduction === false) {
            console.log(`${method.toUpperCase()} request to ${formatUrl(service, path)}`);
          }
          const request = superagent[method](formatUrl(service, path));

          if (params) {
            request.query(params);
          }

          if (headers) {
            Object.keys(headers)
              .forEach(headerKey => request.set(headerKey, headers[headerKey]));
          }

          if (data) {
            request.send(data);
          }

          request.end((error, response) => {
            if (error) {
              if (config.isProduction === false) {
                console.log('API ERROR: ', error);
              }
              return reject(response || error);
            }
            if (config.isProduction === false) {
              console.log('API SUCCESS: ', response.body);
            }
            return resolve(response.body);
          });
        });
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {
    this.nothing = {};
  }
}

export default new ApiClient();
