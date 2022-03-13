import React from 'react';
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';

class Page extends React.Component {
    constructor(props) {
        super(props)
    }

    normalizedChildren () {
        const { children } = this.props;
        return (Array.isArray(children))
            ? children  : [children];
    } 

    render () {
        return (
            <div>
                <h1>App</h1>
                {this.normalizedChildren().map(child => {
                        return child;
                    })}
                <footer>
                    <Link to='/'>Home</Link>  |
                    <Link to='/admin'>Admin</Link> | 
                    <Link to='/about'>About</Link>
                </footer>
            </div>
          );
    }
}

Page.contextType = AppContext;
export default Page;