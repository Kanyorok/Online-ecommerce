import { ADD_TO_CART, REMOVE_ITEM_CART } from "../constants/cartConstants";

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
    case REMOVE_ITEM_CART:
        return {
            ...state,
            cartItems: state.cartItems.filter(i => i.product !== action.payload)
        }
          
      default:
          return state
  }
}