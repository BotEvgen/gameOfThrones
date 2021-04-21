import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../error';
import gotService from '../../../service/gotService'
import RowBlock from '../../RowBlock'
import { withRouter } from 'react-router-dom';


class BookPage extends Component {
   gotService = new gotService();
   state = {
      selectedBook: null,
      error: false,
      clickOnName: false
   }

   componentDidCatch() {
      this.setState({
         error: true
      })
   }
   componentWillUnmount() {
      this.setState({
         clickOnName: false
      })
   }


   onItemSelected = (id) => {
      this.setState({
         selectedBook: id
      })
   }

   clickedOnName = (value) => {
      console.log(value)
      this.setState({
         clickOnName: true
      })
   }
   render() {
      if (this.state.error) {
         return <ErrorMessage />
      }
      const itemList = (<ItemList
         onItemSelected={(itemId) => {
            this.props.history.push(itemId)
         }}
         getData={this.gotService.getAllBooks}
         renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages}})`} />)


      const itemList1 = (<ItemList
         onItemSelected={this.onItemSelected}
         getData={this.gotService.getAllBooks}
         renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages}})`} />)

      const bookDetails = (
         <ItemDetails
            itemId={this.state.selectedBook}
            typeOfGet={this.gotService.getBook}
            clickedOnName={this.clickedOnName} >

            <Field field='name' label='Name' />
            <Field field='numberOfPages' label='NumberOfPages' />
            <Field field='publiser' label='Publiser' />
            <Field field='released' label='Released' />
         </ItemDetails>
      )



      return (
         <RowBlock left={itemList1} right={bookDetails} />)
   }
}

export default withRouter(BookPage)