
import { gql } from "@apollo/client"; 


export const PRODUCTS  = gql`
    query 
        { products {
              index
              Price
              Country
              Date
              Name
              Qty
            }
          }
    
`