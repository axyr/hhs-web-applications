import {api} from '@/api/api.js';

export function getCollections() {
    return api.get('/collections');
}

export function getCategories(collectionId) {
    return api.get(`/collections/${collectionId}/categories`);
}

export function getItems(collectionId) {
    return api.get(`/collections/${collectionId}/items`);
}

export function storeItem(collectionId, item) {
    return api.post(`/collections/${collectionId}/items`, item);
}