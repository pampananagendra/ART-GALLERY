import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CancelOrder = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        street: "",
        town: "",
        pincode: "",
        doorNo: "",
        state: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const CancelMyOrder = async (e) =>{
          var data = {art_id : params.id, user_id : localStorage.getItem('user')}
          try {
            let response = await axios.delete('http://localhost:8081/booking', data);
            navigate("/booking");
          }
          catch(error){
            console.log(error);
            
          }
      }


  return (
    <div className="margin-e">
    <div className="form-container">
      <h1 className="form-title">Booking Form</h1>
      <form className="form" onSubmit={CancelMyOrder}>
        <div className="form-group">
          <label className="form-label" htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="town">Town</label>
          <input
            type="text"
            id="town"
            name="town"
            value={formData.town}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="pincode">Pincode</label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="doorNo">Door Number</label>
          <input
            type="text"
            id="doorNo"
            name="doorNo"
            value={formData.doorNo}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Payment Method</label>
          <div className="form-radio-group">
            <label className="form-radio">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={formData.paymentMethod === "cash_on_delivery"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
            <label className="form-radio m-4">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={formData.paymentMethod === "upi"}
                onChange={handleChange}
              />
              UPI Payment
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-warning">
        Place Order
        </button>
      </form>
    </div>
    </div>
  )
}

export default CancelOrder
