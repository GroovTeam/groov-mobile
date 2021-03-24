let ApiConfig = {};

const baseURL = 'http://10.0.2.2:5001/thepoopcrew-528e4/us-central1/api/';

ApiConfig.register = baseURL + 'auth/register';
ApiConfig.login = baseURL + 'auth/login';

export default ApiConfig;