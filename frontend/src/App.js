import './App.css';
import React from "react";
import AuthorList from "./components/Author";
import BookList from "./components/Books";
import NotFound404 from "./components/NotFound404";
import BooksAuthor from "./components/BooksAuthor";
import LoginForm from "./components/Auth";
import axios from "axios";
import Cookies from "universal-cookie";
import {
    BrowserRouter,
    Route,
    Routes,
    Link,
    Navigate,
    useLocation
} from 'react-router-dom'
import BookForm from "./components/BookForm";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'books': [],
            'token': '',
        }
    }

    create_book(name, authors) {
        const headers = this.get_headers()
        const data = {name: name, authors: authors}
        axios.post(`http://127.0.0.1:8010/api/books/`,data,{headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({books: []})
        })
    }

    delete_book(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8010/api/books/${id}`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({books: []})
        })
    }

    logout() {
        this.set_token('')
    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8010/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8010/api/authors/', {headers}).then(response => {

            this.setState(
                {
                    'authors': response.data
                }
            )
        }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8010/api/books/', {headers}).then(response => {

            this.setState(
                {
                    'books': response.data
                }
            )
        }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers

    }

    componentDidMount() {
        this.get_token_from_storage()
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Authors</Link></li>
                        <li><Link to='/books'>Books</Link></li>
                        <li><Link to='/books/create'>Book create</Link></li>
                        <li>
                            {this.is_auth() ? <button
                                    onClick={() => this.logout()}> Logout </button> :
                                <Link to='/login'>Login</Link>}
                        </li>
                    </nav>

                    <Routes>
                        <Route exact path='/'
                               element={<Navigate to='/authors'/>}/>
                        <Route exact path='/books'
                               element={<BookList books={this.state.books}
                                                  delete_book={(id) => this.delete_book(id)}/>}/>

                        <Route exact path='/books/create'
                               element={<BookForm authors={this.state.authors}
                                                  create_book={(name,authors) => this.create_book(name,authors)}/>}/>
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                        <Route path='/authors'>
                            <Route index element={<AuthorList
                                authors={this.state.authors}/>}/>
                            <Route path=':authorId' element={<BooksAuthor
                                books={this.state.books}/>}/>
                        </Route>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
