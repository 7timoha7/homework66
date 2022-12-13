import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {CaloriesTypeId} from "../../types";
import CardCalories from "../CardCalories/CardCalories";
import Preloader from "../Preloader/Preloader";
import {format} from "date-fns";

const MainCalories = () => {
  const [foodList, setFoodList] = useState<CaloriesTypeId[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const location = useLocation();

  const fetch = useCallback(async () => {
    try {
      setLoader(true);
      const response = await axiosApi.get("calories.json");
      if (response.data) {
        const calorie = Object.keys(response.data).map(item => {
          const itemCalorie = response.data[item];
          itemCalorie.id = item;
          return itemCalorie;
        });
        calorie.sort((a, b) =>
          (parseInt(a.date.split('-').join(''))) - (parseInt(b.date.split('-').join(''))));
        setFoodList(calorie);
      } else {
        setFoodList([]);
      }
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetch().catch(console.error);
  }, [location, fetch]);

  const nawDate = format(new Date(), 'yyyy-MM-dd');

  const totalCalkToDay = () => {
    return foodList.reduce((acc, food) => {
      if (nawDate === food.date) {
        return acc + (parseInt(food.calories));
      }
      return acc;
    }, 0);
  }

  let content = (
    <div className="container-fluid border border-dark p-3">
      <div className="
      d-flex
      justify-content-around
      align-items-center
      bg-info p-3 bg-success
      bg-opacity-25">
        <p className="m-0">Total calories today:</p>
        <p className="m-0 text-primary">{nawDate}</p>
        <p className="m-0 ms-2 text-danger fs-3">
          {totalCalkToDay()} calk
        </p>
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

  if (loader) {
    content = <Preloader/>
  }

  return (
    <>
      {content}
    </>

  );
};

export default MainCalories;