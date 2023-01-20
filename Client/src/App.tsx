import React, {useState} from 'react';
import "./App.css"
import Countries from './components/Countries/Countries';
import Products from './components/Products/Products';
import { Product } from './models/model';


const App:React.FC = ()=> {
  const[country, setCountry] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])
  return (
    <div className="App">
      <header className='heading'>Jumia Scrapped Sugar Data</header>
      <Countries setCountry={setCountry} /> 
      {country?<Products country={country}/>: <div>No seletions made...</div>}
    </div>
  );
}

export default App;
 