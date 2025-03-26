const express = require('express');
const OrderModel = require("../../models/orderModels/order.model")

//POST ORDER API CONTROLLER FUNCTION
const createOrder = async (req, res) => {
    try {
        //DESTRUCTURE REQUEST BODY
        const { name, email, address, phone, productIds, totalPrice } = req.body; 
        //CREATE NEW ORDER
        const order = new OrderModel({ name, email, address, phone, productIds, totalPrice });
        //SAVE ORDER
        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot create order" });
        
    }
};

//GET ORDER BY EMAIL API CONTROLLER FUNCTION   
const getOrderByEmail= async(req, res)=>{
    try {
        //DESTRUCTURE EMAIL FROM REQUEST PARAMS
        const { email } = req.params;

        //FIND ORDER BY EMAIL
        const orders = await OrderModel.find({email}).sort({createdAt: -1});
        if(!orders) {
            return res.status(404).json({ message: "No Orders Found"
                
             })};
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot Get Order by Users Email" });
        
    }

}

module.exports = { createOrder, getOrderByEmail };
// Compare this snippet from backend/controllers/orderControllers/orderController.js: