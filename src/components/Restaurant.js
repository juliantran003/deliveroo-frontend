const Restaurant = (props) => {
  return (
    <div className="restaurant center">
      <div className="restaurant-left">
        <h1>{props.name}</h1>
        <p className="restaurant-description">{props.description}</p>
      </div>
      <img id="restaurant-picture" src={props.picture} alt="restaurant" />
    </div>
  );
};

export default Restaurant;
