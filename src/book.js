import React from 'react';

const Book = ({book, handleChange, shelve}) => (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ((book.imageLinks && book.imageLinks.smallThumbnail) ? `url(${book.imageLinks.smallThumbnail})` : `linear-gradient(black, white)`) }}></div>
                <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf : (shelve(book.id))} onChange={($event) => {handleChange($event, book)}}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title"> { book.title }</div>
            <div className="book-authors">{ book.subtitle }</div>
        </div>
)

export default Book;