import * as React from "react";
import { useNutritionContext } from "../../contexts/nutrition";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../services/apiClient";
import "./NutritionForm.css";

export default function NutritionForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { nutritionStates, nutritionFunctions } = useNutritionContext();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: "",
    calories: "",
    image_url: "",
    category: "",
    quantity: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "name") {
      if (event.target.value !== "") {
        nutritionStates.setError((e) => ({ ...e, name: null }));
      }
    }

    if (event.target.name === "calories") {
      if (event.target.value !== "") {
        nutritionStates.setError((e) => ({ ...e, calories: null }));
      }
    }

    if (event.target.name === "image_url") {
      if (event.target.value !== "") {
        nutritionStates.setError((e) => ({ ...e, image_url: null }));
      }
    }

    if (event.target.name === "category") {
      if (event.target.value !== "") {
        nutritionStates.setError((e) => ({ ...e, category: null }));
      }
    }

    if (event.target.name === "quantity") {
      if (event.target.value !== "") {
        nutritionStates.setError((e) => ({ ...e, quantity: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  }

  const handleOnSubmit = async () => {
    setIsLoading(true);
    nutritionStates.setError((e) => ({ ...e, form: null }));

    if (form.name === "") {
      nutritionStates.setError((e) => ({ ...e, name: "Please enter the name" }));
      setIsLoading(false);
      return;
    }

    if (form.calories === "") {
      nutritionStates.setError((e) => ({ ...e, calories: "Please enter the number of calories" }));
      setIsLoading(false);
      return;
    }

    if (form.image_url === "") {
      nutritionStates.setError((e) => ({ ...e, image_url: "Please enter an image url" }));
      setIsLoading(false);
      return;
    }

    if (form.category === "") {
      nutritionStates.setError((e) => ({ ...e, category: "Please enter a category" }));
      setIsLoading(false);
      return;
    }

    if (form.quantity === "") {
      nutritionStates.setError((e) => ({ ...e, quantity: "Please enter the quantity" }));
      setIsLoading(false);
      return;
    }

    const { data, error } = await ApiClient.createNutrition(form);
    if (error) {
      nutritionStates.setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
      navigate("/nutrition");
    }
    if (data.nutrition) {
      nutritionFunctions.fetchNutrition();
      navigate("/nutrition");
      setIsLoading(false);
    }
  };

  return (
    <div className="nutrition-form">
          <div className="input-field">
            <label>Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Nutrition name"
              value={form.name}
              onChange={handleOnInputChange}
            />
            {nutritionStates.error?.name && (
              <span className="error">{nutritionStates.error.name}</span>
            )}
          </div>
          <div className="input-field">
            <label>Category</label>
            <input
              className="form-input"
              type="text"
              name="category"
              placeholder="Nutrition category"
              value={form.category}
              onChange={handleOnInputChange}
            />
            {nutritionStates.error?.category && (
              <span className="error">{nutritionStates.error.category}</span>
            )}
          </div>
          <div className="split-input-field">
            <div className="input-field">
              <label>Quantity</label>
              <input
                className="form-input"
                type="number"
                name="quantity"
                placeholder="1"
                value={form.quantity}
                onChange={handleOnInputChange}
              />
              {nutritionStates.error?.quantity && (
                <span className="error">{nutritionStates.error.quantity}</span>
              )}
            </div>
            <div className="input-field">
              <label>Calories</label>
              <input
                className="form-input"
                type="number"
                name="calories"
                placeholder="80"
                value={form.calories}
                onChange={handleOnInputChange}
              />
              {nutritionStates.error?.calories && (
                <span className="error">{nutritionStates.error.calories}</span>
              )}
            </div>
          </div>
        <div className="input-field">
          <label>Image Url</label>
          <input
            className="form-input"
            type="text"
            name="image_url"
            placeholder="http://i-am-an-image.com"
            value={form.image_url}
            onChange={handleOnInputChange}
          />
          {nutritionStates.error?.image_url && (<span className="error">{nutritionStates.error.image_url}</span>)}
        </div>
        <button className="submit-nutrition" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Save"}
        </button>
    </div>
  );
}
