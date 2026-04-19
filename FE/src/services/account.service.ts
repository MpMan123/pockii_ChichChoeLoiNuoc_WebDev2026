import api from './api';

export const fetchPortfolio = async () => {
    return api.get('/account/portfolio');
}