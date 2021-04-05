let ApiConfig = {};

const baseURL = 'https://us-central1-thepoopcrew-528e4.cloudfunctions.net/api';

ApiConfig.auth = '/auth';
ApiConfig.register = baseURL + ApiConfig.auth + '/register';
ApiConfig.login = baseURL + ApiConfig.auth + '/login';

ApiConfig.user = '/user';
ApiConfig.profile = baseURL + ApiConfig.user + '/profile';

ApiConfig.posts = '/posts';
ApiConfig.post = baseURL + ApiConfig.posts;
ApiConfig.feed = baseURL + ApiConfig.posts + '/feed';

ApiConfig.posses = baseURL + '/posses';
ApiConfig.joinPosse = ApiConfig.posses + '/join';
ApiConfig.createPosse = ApiConfig.posses + '/create';

ApiConfig.youtube = '/youtube';
ApiConfig.searchYoutube = baseURL + ApiConfig.youtube + '/search';

export default ApiConfig;