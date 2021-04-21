import React, { Component } from 'react';
import './itemDetails.css';
import ErrorMessage from '../error'
import Spinner from '../spinner'


const Field = ({ item, field, label }) => {
   return (<li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
   </li>)
}

export {
   Field
}


export default class ItemDetails extends Component {


   state = {
      item: null,
      loading: false,
      error: false
   }

   componentDidMount() {
      this.updateItem();
   }

   componentDidUpdate(prevProps) {
      if (this.props.itemId !== prevProps.itemId) {
         this.updateItem();
      }
   }


   updateItem() {
      const { itemId, typeOfGet } = this.props;
      if (!itemId) {
         return
      }
      this.setState({
         loading: true
      })
      typeOfGet(itemId)
         .then(this.onItemDetailsLoaded)
         .catch(() => this.onError())
   }


   onItemDetailsLoaded = (item) => {
      this.setState({
         item,
         loading: false
      })
   }

   onError() {
      this.setState({
         item: null,
         error: true
      })
   }


   render() {
      if (!this.state.item && this.state.error) {
         return <ErrorMessage />
      } else if (!this.state.item) {
         return <span className='select-error'>Choose a item</span>
      }
      const { item } = this.state;
      const { name } = item

      if (this.state.loading) {
         return (
            <div className="item-details rounded">
               <Spinner />
            </div>
         )
      }

      return (
         <div className="item-details rounded">
            <h4 onClick={(e) => this.props.clickedOnName(e.target)}>{name}</h4>
            <ul className="list-group list-group-flush">
               {React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, { item })
               })}
            </ul>
         </div>
      );
   }
}