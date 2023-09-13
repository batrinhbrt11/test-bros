
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Product } from "../types";
import ProductList from "./ProductList";

const LIMIT_LENGTH = 20;

type InfinitListProps = {
  state: Product[];
  setState: (products: Product[]) => void;
};
type Fn = () => any;
export default function InfiniteList(props: InfinitListProps) {
  const [skipItem, setSkipItem] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const loadMoreData: Fn = () => {
    fetch(
      `https://dummyjson.com/products?limit=${LIMIT_LENGTH}&skip=${skipItem}`
    )
      .then((res) => res.json())
      .then((json) => {
        props.setState([...props.state, ...json.products]);

        setTotal(json.total);
      })
      .catch((error) => {
        console.log(error);
      });
    setSkipItem(skipItem + 20);
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={props.state.length}
        next={loadMoreData}
        hasMore={props.state.length < total}
        loader={<p>Loading...</p>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p
            style={{
              textAlign: "center",
              fontWeight: "600",
              padding: "10px",
              borderRadius: "16px",
              background: "#647dd7",

              color: "white",
            }}
          >
            Đã xem hết tât!!!
          </p>
        }
      >
        <ProductList products={props.state} />
      </InfiniteScroll>
    </div>
  );
}
