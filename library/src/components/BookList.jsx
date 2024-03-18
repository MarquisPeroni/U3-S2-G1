import React, { Component } from 'react'
import SingleBook from './SingleBook'
import { Col, Form, Row } from 'react-bootstrap'
import CommentArea from './CommentArea';

class BookList extends Component {
  state = {
    searchQuery: '',
    selectedBookAsin: null,
  };

  handleBookSelect = (asin) => {
    this.setState({ selectedBookAsin: asin });
  };

  render() {
    const { searchQuery, selectedBookAsin } = this.state;
    const { books } = this.props;
    return (
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={4} className="text-center">
          <Form.Group>
            <Form.Control
              type="search"
              placeholder="Cerca un libro"
              value={searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Row className="g-2 mt-3">
            {books
              .filter((book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((book) => (
                <Col xs={12} md={12} key={book.asin}>
                  <SingleBook
                    book={book}
                    onSelect={() => this.handleBookSelect(book.asin)}
                    isSelected={selectedBookAsin === book.asin}
                  />
                </Col>
              ))}
          </Row>
        </Col>
        <Col xs={12} md={4}>
          {selectedBookAsin && <CommentArea asin={selectedBookAsin} />}
        </Col>
      </Row>
    );
  }
}

export default BookList
