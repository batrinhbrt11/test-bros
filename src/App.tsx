import React, { useEffect, useState } from "react";
import InfiniteList from "./components/InfiniteList";
import { Product } from "./types";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProductList from "./components/ProductList";

function App() {
  const [state, setState] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.currentTarget.value);
    setState([]);
  };

  const searchData = () => {
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((json) => {
        setState([...state, ...json.products]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const waitForStop = setTimeout(() => {
      if (search !== "") {
        searchData();
      }
    }, 2000);
    return () => clearTimeout(waitForStop);
  }, [search]);
  
  return (
    <div className="App">
      <Input
        size="large"
        placeholder="search"
        suffix={<SearchOutlined />}
        onChange={handleChange}
      />
      {search === "" ? (
        <InfiniteList state={state} setState={setState} />
      ) : (
        <ProductList products={state} />
      )}
    </div>
  );
}

export default App;
