import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './book';


export default class SearchComponent extends Component {
    state = {
      searchValue : '',
      books : []
    }

    handleInput = (value) => {
      this.setState({
        searchValue: value
      })

    if(value !=='') {
        this.getResult(value);
      }
      else {
        this.setState({
          books : []
        })
      }
    }

    getResult = (value) => {
      BooksAPI.search(value)
        .then(res => {
          let books = (res.error || !this.state.searchValue) ? [] : res 
          this.setState({
              books : books
            })
        })
    }


    updateShelve = (event, book) => {
      this.props.updateBook(book, event.target.value)
    }

    getShelveValue = (bookId) => {
      const { shelvedBooks } = this.props;
      let book = shelvedBooks.filter(book => book.id === bookId)
      if(book && book[0]) {
        return book[0].shelf
      }
      else {
        return ''
      }

    }

    render () {
        return (
            <div className="search-books">
                  <div className="search-books-bar">
                    <Link className="close-search" to='/'> 
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Search by title or author"
                        onChange={($event) => {this.handleInput($event.target.value)}}
                      />
      
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                      {this.state.books.map((book) => (
                        <li key={book.id}>
                          <Book book={book} shelve={this.getShelveValue} handleChange={this.updateShelve}/>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
        )
    }
}