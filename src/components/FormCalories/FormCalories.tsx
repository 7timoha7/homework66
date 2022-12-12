import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {CaloriesType} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import {Form} from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
import BtnPreloader from "../BtnPreloader/BtnPreloader";

const FormCalories = () => {
  const [foodData, setFoodData] = useState<CaloriesType>({
    food: '',
    calories: '',
    foodTime: '',
  });

  const [loader, setLoader] = useState<boolean>(false);
  const [btnLoader, seBtnLoader] = useState<boolean>(false);

  const {addEdit} = useParams();
  const navigate = useNavigate();

  const fetch = useCallback(async () => {
    try {
      setLoader(true);
      const response = await axiosApi.get<CaloriesType>("calories/" + addEdit + ".json");
      if (response.data) {
        setFoodData(response.data);
      }
    } finally {
      setLoader(false);
    }
  }, [addEdit]);

  useEffect(() => {
    fetch().catch(console.error);
  }, [addEdit, fetch]);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addEdit === "add") {
      try {
        seBtnLoader(true);
        await axiosApi.post("calories.json", foodData);
      } catch (e) {
        console.log('error' + e);
      } finally {
        seBtnLoader(false);
      }
      navigate("/");
    } else {
      try {
        seBtnLoader(true);
        await axiosApi.put("calories/" + addEdit + ".json", foodData);
      } catch (e) {
        console.log('error' + e);
      } finally {
        seBtnLoader(false);
      }
    }
  }

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFoodData(prev => ({...prev, [name]: value}));
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFoodData(prev => ({...prev, foodTime: e.target.value}));
  }

  const addEditName = () => {
    if (addEdit === "add") {
      return <h2>Add</h2>
    } else {
      return <h2>Edit</h2>
    }
  }

  let content = (
    <Form onSubmit={formSubmit}>
      <Form.Select className="w-50 mb-2" value={foodData.foodTime} onChange={selectChange} required name="foodTime"
                   id="foodTime">
        <option hidden value="">Select?</option>
        <option value="breakfast">Breakfast</option>
        <option value="snack">Snack</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </Form.Select>
      <div>
        <input className="form-control w-50 mb-2" value={foodData.food} onChange={formChange} required type="text"
               name="food"/>
      </div>
      <div>
        <input className="form-control w-50 mb-2" value={foodData.calories} onChange={formChange} required type="number"
               name="calories"/>
      </div>
      <button className="btn btn-outline-warning" disabled={btnLoader}>
        {btnLoader && <BtnPreloader/>}
        {btnLoader ? null : 'Submit'}
      </button>
    </Form>
  );

  if (loader) {
    content = <Preloader/>
  }

  return (
    <div className="border border-warning container-sm p-3">
      {addEditName()}
      {content}
    </div>
  );
};

export default FormCalories;