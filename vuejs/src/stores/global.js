import {defineStore} from 'pinia';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        title: 'Website Title',
        metaTitle: 'Website Title',
        logo: null,
        owner: 'Website Owner',
        collections: [],
        activeCollection: null,
    }),
    getters: {
        year() {
            return new Date().getFullYear();
        },
        footerLine() {
            return `© ${this.year} - ${this.owner}`;
        },
    },
    actions: {
        setCollections(collections) {
            this.collections = collections;
            this.setActiveCollection(collections[0].id);
        },
        setActiveCollection(id) {
            if (!this.collections.length) {
                return null;
            }

            this.activeCollection = this.collections.find(c => c.id === parseInt(id));
            this.setWebsiteTitle(this.activeCollection.name);
            this.setLogo(this.activeCollection.logo);
            this.setWebsiteOwner(this.activeCollection.owner);
            this.setMetaTitle('Page 1');
        },
        setWebsiteTitle(title) {
            this.title = title;
        },
        setMetaTitle(metaTitle) {
            this.metaTitle = metaTitle;
            document.title = this.metaTitle + ' - ' + this.title;
        },
        setLogo(logo) {
            this.logo = logo;
            const link = document.getElementById('favicon');
            link.href = this.logo;
        },
        setWebsiteOwner(owner) {
            this.owner = owner;
        },
    },
});