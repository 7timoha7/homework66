import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {CaloriesTypeId} from "../../types";
import CardCalories from "../CardCalories/CardCalories";

const MainCalories = () => {
  const [foodList, setFoodList] = useState<CaloriesTypeId[]>([]);
  const location = useLocation();

  const fetch = useCallback(async () => {
    const response = await axiosApi.get("calories.json");
    const calorie = Object.keys(response.data).map(item => {
      const itemCalorie = response.data[item];
      itemCalorie.id = item;
      return itemCalorie;
    });
    setFoodList(calorie);
  }, []);

  useEffect(() => {
    fetch().catch(console.error);
  }, [location, fetch]);

  const totalCalk = foodList.reduce((acc, food) => {
    const number = parseInt(food.calories);
    return acc + (number);
  }, 0);

  return (
    <div className="container-fluid border border-dark p-3">
      <div className="d-flex justify-content-around align-items-center bg-info p-3  bg-success bg-opacity-25">
        <span>Total calories: <span className="text-danger fs-3">{totalCalk} calk</span></span>
        <div>
          <Link className="btn btn-danger" to={"/form/add"}>Add</Link>
        </div>
      </div>
      <div>
        {foodList.map(item => {
          return <CardCalories card={item} key={item.id}/>
        })}
      </div>
    </div>
  );
};

export default MainCalories;