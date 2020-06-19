import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelves from './shelves';

export default class ShelveSet extends Component {
    render () {
        const { currentlyReading, wantToRead , read, getAllBooks} = this.props;
        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelves 
                    className="currently-reading" 
                    books={currentlyReading} 
                    title="Currently Reading"
                    updateShelve={getAllBooks}
                    />
                  <Shelves 
                    className="want-to-read" 
                    books={wantToRead} 
                    title="Want to Read"
                    updateShelve={getAllBooks}
                  />
                  <Shelves 
                    className="read" 
                    books={read} 
                    title="Read"
                    updateShelve={getAllBooks}
                  />
                </div>
              </div>
              <div >
                <Link className="open-search" to='/search'> 
                  Add a book
                </Link>
              </div>
            </div>
        )
    }
}