import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchComponent from './searchComponent';
import { Route } from 'react-router-dom';
import ShelveSet from './shelveset';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    wantToRead : [],
    currentlyReading : [],
    read : [],
    showSearchPage: false
  }
  sortBooks = (books) => {
    const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
        const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
        const read = books.filter((book) => book.shelf === 'read')
        this.setState((prevState) => ({
          currentlyReading,
          wantToRead,
          read
        }))
  }
  getAllBooks = () => {
    BooksAPI.getAll()
      .then((res) => {
        this.sortBooks(res)
      })
  }
  componentDidMount () {
    this.getAllBooks()
  }

  updateBook = (book,shelf) => {
    BooksAPI.update(book, shelf)
        .then(res => this.getAllBooks())
  }

  render() {
    return (
      <div className="app">
        <Route 
          exact 
          path="/" 
          render={() => (
            <ShelveSet 
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              getAllBooks={this.getAllBooks}
            />
          )} 
          />
          <Route 
            path="/search"
            render = {() => (
              <SearchComponent
                shelvedBooks = {[...this.state.currentlyReading, ...this.state.read, ...this.state.wantToRead]} 
                updateBook={this.updateBook}
              />
            )}
          />
        </div>
    )
  }
}

export default BooksApp
