import { useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const fetchAvailableMeals = useCallback(async () => {
    setIsLoading(true);
    setLoadingError(null);
    try {
      const response = await fetch(
        "https://food-order-app-51d5e-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("No meals found (");
      }
      const data = await response.json();
      const newMeals = [];
      for (const key in data) {
        newMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(newMeals);
    } catch (error) {
      setLoadingError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAvailableMeals();
  }, [fetchAvailableMeals]);

  let content = <h3 className={classes.logger}>Sorry, no meals in menu.</h3>;
  if (isLoading) {
    content = <h3 className={classes.logger}>Please wait, loading menu...</h3>;
  }
  if (loadingError) {
    content = <h3 className={classes.logger}>{loadingError}</h3>;
  }
  if (meals.length > 0) {
    const mealsList = meals.map((meal) => {
      return (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      );
    });
    content = <ul>{mealsList}</ul>;
  }
  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};
export default AvailableMeals;
