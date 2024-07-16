import React, { useState } from "react";

const Payment = () => {
    
    return (
        <div className="row" style={{justifyContent:"center"}}>
            <div className="col-4">
                <form className="p-3">
                    <div className="form-group">
                        <label htmlFor="userId">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="userName"
                        />
                    </div>
                    {/* Additional form groups for sock details */}
                    <div className="form-group">
                        <label htmlFor="userId">Card Numer</label>
                        <input
                            type="text"
                            className="form-control"
                            id="card"
                            name="card"
                        />
                    </div>
                    {/* Sock Details */}
                    <div className="form-group">
                        <label htmlFor="userId">Billing Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userId">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userId">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userId">Zip Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="zip"
                            name="zip"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;