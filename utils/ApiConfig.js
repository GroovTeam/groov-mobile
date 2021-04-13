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
ApiConfig.like = baseURL + ApiConfig.posts + '/like';
ApiConfig.unlike = baseURL + ApiConfig.posts + '/unlike';

ApiConfig.posses = baseURL + '/posses';
ApiConfig.joinPosse = ApiConfig.posses + '/join';
ApiConfig.createPosse = ApiConfig.posses + '/create';

ApiConfig.beats = '/beats';
ApiConfig.getBeats = baseURL + ApiConfig.beats;

export default ApiConfig;