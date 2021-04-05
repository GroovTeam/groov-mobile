let ApiConfig = {};

const baseURL = 'https://us-central1-thepoopcrew-528e4.cloudfunctions.net/api';

ApiConfig.register = baseURL + '/auth/register';
ApiConfig.login = baseURL + '/auth/login';

ApiConfig.feed = baseURL + '/posts/feed';
ApiConfig.post = baseURL + '/posts';

ApiConfig.posses = baseURL + '/posses';
ApiConfig.joinPosse = ApiConfig.posses + '/join';
ApiConfig.createPosse = ApiConfig.posses + '/create';

export default ApiConfig;