import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components'
import ErrorMessage from '../error';
import { CharacterPage, BookPage, HousePage, BooksItem } from '../pages/';
import gotService from '../../service/gotService';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css'

const Btn = styled.button`
      padding: 12px;
    background-color: #1e2edb;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 40px;
    outline: none;
    box-shadow: 0px 0px 30px rgba(256,256,256,.1);
    cursor: pointer;
`


export default class App extends React.Component {
   gotService = new gotService();
   constructor() {
      super();
      this.state = {
         RandomCharState: true,
         error: false
      }
      this.changeChar = this.changeChar.bind(this)
   }

   componentDidCatch() {
      console.log('error')
      this.setState({
         error: true
      })
   }

   changeChar() {
      this.setState(
         { RandomCharState: !this.state.RandomCharState })
   }

   render() {

      const renderChar = this.state.RandomCharState ? <RandomChar /> : null;
      if (this.state.error) {
         return <ErrorMessage />
      }
      return (
         <Router>

            <div className='app'>
               <Container>
                  <Header />
               </Container>
               <Container>
                  <Row>
                     <Col lg={{ size: 5, offset: 0 }}>
                        {renderChar}
                        <Btn onClick={this.changeChar}>Char</Btn>
                     </Col>
                  </Row>
                  <Route path='/' exact component={() => <h1>Welcome to BD</h1>} />
                  <Route path='/characters' component={CharacterPage} />
                  <Route path='/houses' component={HousePage} />
                  <Route path='/books' exact component={BookPage} />
                  <Route path='/books/:id' render={
                     ({ match }) => {
                        const { id } = match.params;
                        return <BooksItem bookId={id} />
                     }
                  } />
               </Container>
            </div>
         </Router>
      )
   }
}
