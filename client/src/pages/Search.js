import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
    state={
        search: "",
        books: []
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
      saveBook = b=>{
          const newBooks = this.state.books.filter(btc=> b.volumeInfo.infoLink !== btc.volumeInfo.infoLink );
          API.saveBook({
            title: b.volumeInfo.title,
            authors: b.volumeInfo.authors,
            description: b.volumeInfo.description,
            image: b.volumeInfo.imageLinks.thumbnail,
            link: b.volumeInfo.infoLink
          }).then(res=>{
            this.setState({
              books: newBooks
            })
          })
      }
      handleFormSubmit = e=>{
          e.preventDefault();
          if(this.state.search){
              API.searchBook(this.state.search)
                .then(res =>{
                    console.log("Total items: "+res.data.totalItems);
                    this.setState({
                        books: res.data.items
                    })
                })
          }
      }
      getSavedBooks = ()=>{
        API.getBooks().then(res=>{
          this.setState({
            savedBooks: res.data
          })
        })
      }
    render(){
        return (
            <Container fluid>
            <Row>
                <Col size="md-6">
                <Jumbotron>
              <h1>Search</h1>
            </Jumbotron>
                <form>
                    <Input
                    value={this.state.search}
                    onChange={this.handleInputChange}
                    name="search"
                 placeholder="Search Terms"
                />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
            </Col>
            <Col size="md-6">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <Link to={book.volumeInfo.infoLink}>
                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors.join(", ")}
                      </strong>
                    </Link>
                    <button className="btn btn-primary" style={{float: "right"}}onClick={() => this.saveBook(book)} >
                      Save
                      </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </Col>
            </Row>
            
            </Container>
            );
    }
}
export default Search;