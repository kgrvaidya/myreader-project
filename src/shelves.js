import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './book';

export default class Shelves extends Component{
    state = {
      books : {}
    }

    handleChange = (event, book) => {
      BooksAPI.update(book, event.target.value)
        .then(res => this.props.updateShelve())
    }
    render () {
        return (
            <div>
                <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      
                      {this.props.books.map((book) => (
                          <li key={book.id}>
                          <Book book={book} handleChange={this.handleChange} />
                        </li>
                      ))}
                      
                    </ol>
                  </div>
                </div>
            </div>
        )
    }

}