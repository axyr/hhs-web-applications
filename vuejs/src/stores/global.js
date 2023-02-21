import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    title: "Website Title",
    metaTitle: "Website Title",
    logo: null,
    owner: "Website Owner",
    collections: {
      books: {
        title: "Books",
        url: "/collections/books/index.json",
      },
      pokemon: {
        title: "Pokemon",
        url: "/collections/pokemon/index.json",
      },
    },
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
    setWebsiteTitle(title) {
      this.title = title;
    },
    setMetaTitle(metaTitle) {
      this.metaTitle = metaTitle;
      document.title = this.metaTitle + " - " + this.title;
    },
    setLogo(logo) {
      this.logo = logo;
      const link = document.getElementById("favicon");
      link.href = this.logo;
    },
    setWebsiteOwner(owner) {
      this.owner = owner;
    },
  },
});
