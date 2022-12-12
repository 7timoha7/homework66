import React from 'react';
import axiosApi from "../../axiosApi";
import {CaloriesTypeId} from "../../types";
import {Link, useNavigate} from "react-router-dom";

interface Props {
  card: CaloriesTypeId
}

const CardCalories: React.FC<Props> = ({card}) => {

  const navigate = useNavigate();

  const btnDelete = async () => {
    try {
      await axiosApi.delete("calories/" + card.id + ".json");
    } catch (e) {
      console.log('error' + e);
    }
    navigate("/");
  }

  return (
    <div className="border border-dark border-5 rounded-4 mt-2 p-2 bg-success bg-opacity-25">
      <div className="mb-3">
        <p className="bg-info d-inline p-lg-2 rounded-bottom">{card.foodTime.toUpperCase()}</p>
      </div>
      <div className="mb-3">
        <span>Type of food: </span>
        <p className="d-inline bg-warning p-lg-2 rounded-bottom">{card.food}</p>
      </div>
      <div className="mb-3">
        <span>Calories: </span>
        <p className="d-inline bg-danger p-lg-2 rounded-bottom">{card.calories}</p>
      </div>
      <div>
        <Link className="btn btn-outline-info me-2" to={"/form/" + card.id}>edit</Link>
        <button className="btn btn-outline-danger" onClick={btnDelete}>delete</button>
      </div>
    </div>
  );
};

export default CardCalories;