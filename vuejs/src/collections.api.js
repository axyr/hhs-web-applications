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

export function storeItem(item) {
    return api.post(`/items`, item);
}

export function deleteItem(id) {
    return api.delete(`/items/${id}`);
}

export function updateItem(item) {
    return api.patch(`/items/${item.id}`, item);
}