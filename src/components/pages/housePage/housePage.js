import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../error';
import gotService from '../../../service/gotService'
import RowBlock from '../../RowBlock'


export default class HousePage extends Component {
   gotService = new gotService();
   state = {
      selectedHouse: null,
      error: false
   }

   componentDidCatch() {
      this.setState({
         error: true
      })
   }


   onItemSelected = (id) => {
      this.setState({
         selectedHouse: id
      })
   }
   render() {
      if (this.state.error) {
         return <ErrorMessage />
      }
      const itemList = (<ItemList
         onItemSelected={this.onItemSelected}
         getData={this.gotService.getAllHouses}
         renderItem={({ name, region }) => `${name} (${region}})`} />)

      const bookDetails = (<ItemDetails
         itemId={this.state.selectedHouse}
         typeOfGet={this.gotService.getHouse} >

         <Field field='name' label='Name' />
         <Field field='region' label='Region' />
         <Field field='words' label='Words' />
         <Field field='titles' label='Titles' />
         <Field field='overlord' label='Overlord' />
         <Field field='ancestralWeapons' label='AncestralWeapons' />
      </ItemDetails>
      )


      return (
         <RowBlock left={itemList} right={bookDetails} />
      )
   }
}