import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Link } from 'react-router-dom';
import Controls from './Controls';
import Questions from './Questions';
import { AppContext } from './AppContext';
// import { useContext } from "react";

function Admin () {
    const {server, title} = useContext(AppContext);
    const [questionList, setQuestionList] = useState([]);
    const [question, setQuestion] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const printQuestionList = useCallback(() => {
        console.log("Changed questionList: ", questionList);
      }, [questionList]);
    
      useEffect(() => {
        console.log("See: ", title, server.all())
        setQuestionList(server.all())
      }, []);


      const handleSearch = () => {
        console.log(`Search: ${question}`);
        setSearchTerm(question);
      };

      const handleCreate = () => { 
        const newQuestion = {
          id: Date.now(),
          question
        };
         
        setQuestionList([...questionList, server.add(newQuestion)]);
        setQuestion('');
      };
    
      const handleDelete = useCallback((id) => {
        server.delete(id)
        setQuestionList(questionList.filter(q => q.id !== id))
      }, [questionList]);

      const handleUpdate = useCallback((question) => {
        const updated = {id: question.id, question: question.questionValue}
        server.update(updated)
        setQuestionList([...questionList.filter(q => q.id !== updated.id), updated ])
      }, [questionList]);
    
      const filteredQuestionList = useMemo(() => questionList.filter((question) => {
        console.log("Filtering: ", question);
        return question.question.toLowerCase().includes(searchTerm.toLowerCase());
      }), [searchTerm, questionList]);
      
    return (
        <div className="Panel">
            <h3>Admin</h3>
            This is just a panel 
            <div>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={() => handleSearch()}>Search</button>
            <button onClick={() => handleCreate()}>Add</button>
            </div>
            <Questions 
                questions={filteredQuestionList} 
                handleDelete={handleDelete} 
                handleUpdate={handleUpdate}
            />
            <Controls />
            <Link to="/about">About</Link>
        </div>
    );
}

// Admin.contextType = AppContext;
export default Admin;