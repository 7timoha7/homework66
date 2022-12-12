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
    <div>
      <div>
        <p>{card.foodTime}</p>
        <p>{card.food}</p>
      </div>
      <div>
        <p>{card.calories}</p>
      </div>
      <div>
        <Link to={"/form/" + card.id}>edit</Link>
        <button onClick={btnDelete}>delete</button>
      </div>
    </div>
  );
};

export default CardCalories;