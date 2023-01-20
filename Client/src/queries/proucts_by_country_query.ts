import { gql } from "@apollo/client";

export const PRODUCT = gql`
    query ($Country: String!) {
        product(Country: $Country) {
          index
          Price
          Country
          Date
          Name
          Qty
    }
  }
`