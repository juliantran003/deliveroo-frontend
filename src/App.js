import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import Restaurant from "./components/Restaurant";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div>
      <div className="header-around">
        <div className="center">
          <Header headerStyle="header" />
        </div>
      </div>
      <div className="header-around">
        <Restaurant
          name={isLoading ? <span>Loading...</span> : data.restaurant.name}
          description={
            isLoading ? <span>Loading...</span> : data.restaurant.description
          }
          picture={
            isLoading ? <span>Loading...</span> : data.restaurant.picture
          }
        />
      </div>
      <div className="rest">
        <div className="container center">
          <div className="left">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              data.categories.map((categories, index) => {
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
                          <div className="item-container" key={meals.id}>
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
              })
            )}
          </div>
          <div className="right">
            <div className="basket"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
