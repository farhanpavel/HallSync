import SSLCommerzPayment from "sslcommerz-lts";
import prisma from "../db.js";

import { v4 as uuidv4 } from "uuid";
// Initialize the SSLCommerzPayment
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

export const initiatePayment = async (req, res) => {
  const { paymentId, month, year } = req.body;
  const paymentData = await prisma.payment.findFirst({
    where: {
      payment_id: paymentId,
    },
  });
  const data = {
    total_amount: paymentData.fee,
    currency: "BDT",
    tran_id: paymentId, // use unique tran_id for each api call
    success_url: `https://hallsync.onrender.com/api/ssl/success/${paymentId}`,

    fail_url: "https://hallsync.onrender.com/api/ssl/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
    console.log("Redirecting to: ", GatewayPageURL);
  });
};
export const successPayment = async (req, res) => {
  try {
    const updatedPayment = await prisma.payment.update({
      where: {
        payment_id: req.params.id,
      },
      data: {
        status: 1,
      },
    });

    // Check if the payment was successfully updated
    if (updatedPayment) {
      res.redirect("https://hall-sync.vercel.app/studentdashboard/payment"); // Redirect user to the dashboard
    } else {
      res.status(404).json({ error: "Payment not found or update failed" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to update payment status",
      details: error.message,
    });
  }
};
export const failedPayment = async (req, res) => {
  res.redirect("https://hall-sync.vercel.app/studentdashboard/payment");
};
