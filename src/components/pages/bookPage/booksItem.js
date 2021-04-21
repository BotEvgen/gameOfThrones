import gotService from '../../../service/gotService';
import React, { Component } from 'react';
import ItemDetails, { Field } from '../../itemDetails';


export default class BookItem extends Component {

   gotService = new gotService();

   render() {
      return (

         <ItemDetails
            itemId={this.props.bookId}
            typeOfGet={this.gotService.getBook} >

            <Field field='name' label='Name' />
            <Field field='numberOfPages' label='NumberOfPages' />
            <Field field='publiser' label='Publiser' />
            <Field field='released' label='Released' />
         </ItemDetails>
      )
   }
}