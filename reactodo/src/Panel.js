import React from 'react';
import { Link } from 'react-router-dom';
import Controls from './Controls';
import Questions from './Questions';
import { AppContext } from './AppContext';

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { questions: []};
    }

    updateQuestions () {
        this.setState({ posts:  this.context.server.all()});
    }

    componentDidMount () {
        this.context.bus.on("add", this.add.bind(this));
        this.updateQuestions();
    }

    add (question) {
        console.log("Panel: ", question);
        this.context.server.add(question)
        this.updateQuestions();
    }

    render () {
        return (
            <div className="Panel">
                This is just a panel {this.context.title}
                <Questions questions={this.state.questions} />
                <Controls />
            </div>
          );
    }
}

Panel.contextType = AppContext;
export default Panel;