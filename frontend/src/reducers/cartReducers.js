import { ADD_TO_CART } from "../constants/cartConstants";

function getInitialState(){
    return{
        cartItems: localStorage.getItem('cartItems') 
                ? JSON.parse(localStorage.getItem('cartItems')) 
                : []
    }
   }

export const cartReducer = (state = getInitialState(), action) => {
    
  switch (action.type){
      case ADD_TO_CART:
          const item= action.payload;

          const isItemExist = state.cartItems.find(i => i.product === item.product)

          if(isItemExist){
              return {
                  ...state,
                  cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
              }             
          }else{
              return{
                  ...state,
                  cartItems: [...state.cartItems, item]
              }
          }
          
      default:
          return state
  }
}