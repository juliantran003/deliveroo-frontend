import { useState } from "react";

const Counter = (props) => {
  const [counter, setCounter] = useState(1);
  const handleClick = (action) => {
    if (action === "plus") {
      setCounter(counter + 1);
    } else if (action === "minus") {
      setCounter(counter - 1);
    }
  };
  return (
    <p className="total">
      <div className="basket-item">
        <div>
          <i
            class="fas fa-minus-circle"
            onClick={() => {
              handleClick("minus");
            }}
          ></i>
          {counter}
          <i
            class="fas fa-plus-circle"
            onClick={() => {
              handleClick("plus");
            }}
          ></i>
        </div>
        <div className="basket-meal">{props.meal}</div>
      </div>
      <div className="basket-price">{props.price} €</div>
    </p>
  );
};

export default Counter;
