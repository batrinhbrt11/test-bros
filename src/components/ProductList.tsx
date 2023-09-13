import { List } from "antd";
import React from "react";
import { Product } from "../types";
type ProductListProps = {
  products: Product[];
};
export default function ProductList(props: ProductListProps) {
  return (
    <div>
      <List
        dataSource={props.products}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div>
              <h3>
                {item.id} {item.title}
              </h3>
              <p>{item.description}</p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
