export default class BaseService {
  setConfig(config) {
    this.config = config;
  }

  runRequest(input, init, includeToken) {
    if (includeToken && this.config.token) {
      const headers = init.headers || {};
      headers['custom-token'] = this.config.token;
      init.headers = headers;
    }

    return fetch(input, init);
  }
}
