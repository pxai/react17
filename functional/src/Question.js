export default function Question (question) {
    return (
        <div>
            <div className="question">
                <h4>{question.question}</h4>
            </div>
            <div className="answer">
            </div>    
        </div>
    );
}