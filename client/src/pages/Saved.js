import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Saved extends Component {
    state={
        savedBooks: []
    }
    componentDidMount() {
        this.loadBooks();
      }
    loadBooks = () => {
        API.getBooks()
          .then(res =>
            this.setState({ savedBooks: res.data})
          )
          .catch(err => console.log(err));
    };
    deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
      };
    render(){
        return (
            <Container fluid>
                {this.state.savedBooks.length ? (
                    <List>
                        {this.state.savedBooks.map(book=>(
                            <ListItem key={book.id}>
                                <img src={book.image}></img>
                                <strong>
                                    {book.title} by {book.authors.map(aut=>(
                                        aut+", "
                                    )
                                        )}
                                </strong>
                                <DeleteBtn onClick={()=>this.deleteBook(book._id)}/>
                                <p>
                                    {book.description}
                                </p>
                                
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <h3>No results to display</h3>
                )}
            </Container>
            );
    }
}

export default Saved;