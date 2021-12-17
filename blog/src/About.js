import React from 'react';
import { AppContext } from './AppContext';

export default class About extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="Panel">
                This is About
            </div>
          );
    }
}
