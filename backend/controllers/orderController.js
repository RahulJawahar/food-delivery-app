import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {

        const { address, items, amount } = req.body;

        // create order (directly from frontend items)
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: items,     //  from frontend
            amount: amount,
            address: address
        });

        await newOrder.save();

        //  clear cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}
//users order for frontend

const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    }catch(error){
        console.log({success:false,message:"Error"})
    }

}

export { placeOrder ,userOrders};