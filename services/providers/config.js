exports.config = {
    collection: "db_mongo",
    document: [
        { users: "doc_user" },
        { products: "doc_product" },
        { alerts: "doc_alert" },
        { activity: "doc_activity" },
        { news: "doc_news" },
        { downloads: "doc_download" },
        { about: "doc_about" },
        { contact: "doc_contact" },
        { category: "doc_category" },
        { menu_item: "doc_menuItem" },
        { article: "doc_articles" },
        { art_category: "doc_artCategory" }
    ]
};

exports.getCollection = () => {
    return this.config.collection;
}
exports.getDocument = () => {
    return this.config.document;
}