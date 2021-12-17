export default function quizEndpoint () {
    return fetch('http://localhost:3000/quiz.json')
        .then(data => data.json());
}