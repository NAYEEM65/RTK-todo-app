import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

function App() {
    return (
        <div className="grid gap-6 py-20 place-items-center bg-blue-100 h-auto px-6 font-sans">
            <Navbar />

            <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
                <Header />

                <hr className="mt-4" />

                <TodoList />

                <hr className="mt-4" />

                <Footer completed={false} />
            </div>
        </div>
    );
}

export default App;
