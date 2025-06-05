import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './board/ListPage';
import DetailPage from './board/DetailPage';
import FormPage from './board/FormPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <header>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<ListPage/>}/>
                        <Route path="/detail/:id" element={<DetailPage/>}/>
                        <Route path="/create" element={<FormPage/>}/>
                        <Route path="/edit/:id" element={<FormPage/>}/>
                    </Routes>
                </main>
            </div>
            <footer style={{marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem'}}>
                <p>© 2025 게시판 예제. All rights reserved.</p>
            </footer>
        </Router>
    );
}

export default App;
