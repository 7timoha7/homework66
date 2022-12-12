import React, {useState} from 'react';
import axiosApi from "../../axiosApi";
import {CaloriesTypeId} from "../../types";
import {Link, useNavigate} from "react-router-dom";
import BtnPreloader from "../BtnPreloader/BtnPreloader";

interface Props {
  card: CaloriesTypeId
}

const CardCalories: React.FC<Props> = ({card}) => {

  const [btnLoader, setBtnLoader] = useState<boolean>(false)

  const navigate = useNavigate();

  const btnDelete = async () => {
    try {
      setBtnLoader(true);
      await axiosApi.delete("calories/" + card.id + ".json");
    } catch (e) {
      console.log('error' + e);
    } finally {
      setBtnLoader(false);
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
        <Link className="btn btn-outline-info me-2" to={"/form/" + card.id}>Edit</Link>
        <button className="btn btn-outline-danger" onClick={btnDelete} disabled={btnLoader}>
          {btnLoader && <BtnPreloader/>}
          {btnLoader ? null : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default CardCalories;