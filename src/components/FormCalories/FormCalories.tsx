import React, {useState} from 'react';
import axiosApi from "../../axiosApi";
import {CaloriesType} from "../../types";
import {useNavigate, useParams} from "react-router-dom";

const FormCalories = () => {
  const [foodData, setFoodData] = useState<CaloriesType>({
    food: '',
    calories: '',
    foodTime: '',
  });

  const {addEdit} = useParams();
  const navigate = useNavigate();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addEdit === "add") {
      try {
        await axiosApi.post("calories.json", foodData);
      } catch (e) {
        console.log('error' + e);
      }
    } else {
      try {
        await axiosApi.put("calories/" + addEdit + ".json", foodData);
      } catch (e) {
        console.log('error' + e);
      }
    }
    navigate("/");
  }

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFoodData(prev => ({...prev, [name]: value}));
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFoodData(prev => ({...prev, foodTime: e.target.value}));
  }

  return (
    <div>
      <form onSubmit={formSubmit}>
        <select onChange={selectChange} required name="foodTime" id="foodTime">
          <option hidden value="">Select?</option>
          <option value="breakfast">Breakfast</option>
          <option value="snack">Snack</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <div>
          <input onChange={formChange} required type="text" name="food"/>
        </div>
        <div>
          <input onChange={formChange} required type="number" name="calories"/>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FormCalories;