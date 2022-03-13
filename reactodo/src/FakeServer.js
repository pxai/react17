export default class FakeServer {
    constructor () {
        this.posts = [];
        this.init();
    }

    init () {
        this.posts.push({ id:1, question: 'aaa'});
        this.posts.push({ id:2 ,question: 'bbb'});
    }

    all () {
        return this.posts;
    }

    show (index) {
        return this.posts[index];
    }

    add (post) {
        console.log("Added: ", post)
        this.posts.push(post);
        return post;
    }

    update (updatedPost) {
        console.log("Updated: ", updatedPost)
        this.posts = [...this.posts.filter(post => post.id !== updatedPost.id), updatedPost]
        return updatedPost;
    }

    delete (id) {
        this.posts = this.posts.filter(post => post.id !== id);
        return id;
    }
}