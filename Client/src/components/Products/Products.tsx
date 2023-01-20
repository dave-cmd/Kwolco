import React, { useState, useEffect } from "react";
import {  useQuery } from "@apollo/client";
import { PRODUCT } from "../../queries/proucts_by_country_query";
import { Product } from "../../models/model";

interface Props {
    country: string
}
const Products = ({country}: Props)=>{
    // const filter = parseInt(country)
    const {loading, data, error} = useQuery(PRODUCT, {
        variables: { Country: country }
    })

    const [productInfo, setProductInfo] = useState<Product[]>([])
    useEffect(()=>{
        if (typeof data === 'object' && error === undefined) {
            console.log(data)
            setProductInfo([data.product][0])
        }
        
    },[data])
    console.log(productInfo[0])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    if (error) {
        console.log(error)
        return (
            <div>GraphQL loading user error</div>
        )
    }

    return (
   
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Qty(kg)</th>
                <th>Price</th>
                <th>Country</th>
                <th>Date</th>
            </tr>
            {productInfo.map(item=>{
                return (            
                <tr key={item.index}>
                    <td key={item.index}>{item.index} </td>
                    <td key={item.index}>{item.Name}</td>
                    <td key={item.index}>{item.Qty}</td>
                    <td key={item.index}>{item.Price}</td>
                    <td key={item.index}>{item.Country}</td>
                    <td key={item.index}>{item.Date}</td>
                </tr>)
            })}


        </table>
    )
}

export default Products;