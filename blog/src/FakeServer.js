export default class FakeServer {
    constructor () {
        this.posts = [];
        this.init();
    }

    init () {
        this.posts.push({ name: 'aaa'});
        this.posts.push({ name: 'bbb'});
    }

    all () {
        return this.posts;
    }

    post (index) {
        return this.posts[index];
    }

    add (post) {
        this.posts.push(post);
    }
}