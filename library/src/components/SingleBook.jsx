import { Component } from 'react'
import { Card } from 'react-bootstrap'

class SingleBook extends Component {
  state = {
    selected: false,
  }

  render() {
    const { book, isSelected, onSelect } = this.props; 
    return (
      <>
        <Card
          onClick={onSelect}
          style={{ border: isSelected ? '3px solid red' : 'none' }}
        >
          <Card.Img variant="top" src={book.img} />
          <Card.Body>
            <Card.Title style={{ color: 'black' }}>
              {this.props.book.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default SingleBook
