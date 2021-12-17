import React from 'react';
import { Link } from 'react-router-dom';
import Controls from './Controls';
import Posts from './Posts';
import { AppContext } from './AppContext';

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { posts: []};
    }

    updatePosts () {
        this.setState({ posts:  this.context.server.all()});
    }

    componentDidMount () {
        this.context.bus.on("add", this.add.bind(this));
        this.updatePosts();
    }

    add (post) {
        console.log("Panel: ", post);
        this.context.server.add(post)
        this.updatePosts();
    }

    render () {
        return (
            <div className="Panel">
                This is just a panel {this.context.title}
                <Posts posts={this.state.posts} />
                <Controls />
                <Link to="/about">About</Link>
            </div>
          );
    }
}

Panel.contextType = AppContext;
export default Panel;