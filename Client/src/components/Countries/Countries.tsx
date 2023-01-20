import React, {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../../queries/products_query";
import { Product } from "../../models/model";
import "./Countries.css"


interface Props {
    setCountry: React.Dispatch<React.SetStateAction<string>>  
}

const Countries = ({setCountry }: Props)=>{
    const {data, loading, error} = useQuery(PRODUCTS)
    const [countriesData, setCountriesData] = useState<Product[]>([])

    useEffect(()=>{
        if(typeof data === 'object' && error === undefined) {
            // let unique = [...new Set(myArray)];
            setCountriesData(data.products)
        }
    },[data])
    
    if (loading) {
        return (
            <div>Loading ...</div>
        )
    }

    else if (error) {
        return (
            <div>GraphQL Error Occurred...</div>
        )
    }
    return (

        <div className="padding">
            <label htmlFor="country-select">Select Country:  </label>
            <select name="country-select" onChange={(event)=>setCountry(event.target.value)}>
                {[{"index":1,"Country":"Kenya"},{"index":2,"Country":"Uganda"}, {"index":3,"Country":"Nigeria"}].map(item=><option key={item.Country} value={item.Country} >{item.Country}</option>)}
            </select>
        </div>
    )
}

export default Countries;