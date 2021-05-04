import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Counter from "./components/Counter";
import { useState, useEffect } from "react";
import Restaurant from "./components/Restaurant";

function App() {
  const [basket, setBasket] = useState([]);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-julian.herokuapp.com/"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div>
      <div className="header-around">
        <div className="center">
          <Header headerStyle="header" />
        </div>
      </div>
      <div className="header-around">
        <Restaurant
          name={data.restaurant.name}
          description={data.restaurant.description}
          picture={data.restaurant.picture}
        />
      </div>
      <div className="rest">
        <div className="container center">
          <div className="left">
            {data.categories.map((categories, index) => {
              return (
                <div key={index}>
                  <div>
                    {categories.meals.length !== 0 && (
                      <h2>{categories.name}</h2>
                    )}
                  </div>
                  <div className="category-container">
                    {categories.meals.map((meals, index) => {
                      return (
                        <div
                          className="item-container"
                          key={meals.id}
                          onClick={() => {
                            const newBasket = [...basket];
                            newBasket.push({
                              id: meals.id,
                              meal: meals.title,
                              price: meals.price,
                            });
                            setTotal(total + Number(meals.price));

                            setBasket(newBasket);
                            console.log({ basket });
                          }}
                        >
                          <div className="item-description">
                            <h3>{meals.title}</h3>
                            <div className="meal-description">
                              <p>{meals.description}</p>
                            </div>
                            <p>
                              {meals.price} € {""}
                              {meals.popular === true && (
                                <span>
                                  <i className="fas fa-star"></i> Populaire
                                </span>
                              )}
                            </p>
                          </div>
                          {meals.picture && (
                            <img
                              className="meal-pic"
                              src={meals.picture}
                              alt=""
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="right">
            <div className="basket">
              <div className="basket-list">
                {basket.length === 0 ? (
                  <h3>Mon panier est vide</h3>
                ) : (
                  basket.map((basket, index) => {
                    return (
                      <div>
                        <Counter price={basket.price} meal={basket.meal} />
                      </div>
                    );
                  })
                )}
              </div>

              <div className="basket-bottom">
                <div className="line"></div>
                <div className="total">
                  <p>Sous-total</p> <p>{parseFloat(total).toFixed(2)} €</p>
                </div>
                <div className="total">
                  <p>Frais de livraison</p> <p>2.50 €</p>
                </div>
                <div className="line"></div>
                <div className="total">
                  <p>Total</p> <p>{parseFloat(total + 2.5).toFixed(2)} €</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
