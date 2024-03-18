import React, { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  }

  componentDidMount = () => {
    this.fetchComments(this.props.asin);
  };

  componentDidUpdate(prevProps) {
    if (this.props.asin !== prevProps.asin) {
      this.fetchComments(this.props.asin);
    }
  }

  fetchComments = async (asin) => {
    try {
      this.setState({ isLoading: true, isError: false });
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: { 
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWMwZjRjNTllYzAwMTk5MGQ2ZjkiLCJpYXQiOjE3MTA3Njg0ODgsImV4cCI6MTcxMTk3ODA4OH0.r6EY7kOTM7XqYsDgFqJQKTXvy9D5CANc3rdKd62OZZg`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error ('Errore durante il recupero dei commenti');
    }

    const comments = await response.json();
    this.setState({ comments, isLoading: false });
  } catch (error) {
    console.error(error);
    this.setState({ isLoading: false, isError: true });
  }
};



  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    )
  }
}

export default CommentArea

