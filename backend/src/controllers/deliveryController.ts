import expressAsyncHandler from "express-async-handler";
import Delivery from "../models/deliveryModel";

export const addDelivery = expressAsyncHandler(async (req, res) => {
  const sender = req.body.user._id;
  const {
    package_id,
    receiver,
    date,
    priority,
    pickup_location,
    drop_location,
  } = req.body;
  try {
    const newDelivery = new Delivery({
      package_id,
      receiver,
      sender,
      date,
      priority,
      // drop_location,
      // pickup_location,
      status: "pending",
    });

    const delivery = await newDelivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export const getDeliveryByStatus = expressAsyncHandler(async (req, res) => {
  try {
    const delivery = await Delivery.find({ status: req.params.status });
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
export const getDeliveryByUserId = expressAsyncHandler(async (req, res) => {
  const sender = req.body.user._id;
  try {
    const delivery = await Delivery.find({ sender });
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("PROBLEM IN FETCHING LIST");
  }
});

export const getDeliveryById = expressAsyncHandler(async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export const updateDeliveryById = expressAsyncHandler(async (req, res) => {
  const { name, status, phone, address } = req.body;
  //Build delivery object
  const deliveryFields = {} as {
    name: string;
    status: string;
    phone: string;
    address: string;
  };
  if (name) deliveryFields.name = name;
  if (status) deliveryFields.status = status;
  if (phone) deliveryFields.phone = phone;
  if (address) deliveryFields.address = address;
  try {
    let delivery = await Delivery.findById(req.params.id);

    if (!delivery) res.status(404).json({ msg: "Delivery not found" });

    delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { $set: deliveryFields },
      { new: true }
    );
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/**
 * Update the status of an delivery by ID
 * @returns The updated delivery object as a JSON response, or a 404 error if the delivery is not found
 */
export const updateDelivery = expressAsyncHandler(async (req, res) => {
  try {
    // Get the delivery ID from the request parameters
    const id = req.params.id;

    // Get the new status from the request body
    const { status } = req.body;

    // Find the delivery by ID and update its status
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // If the delivery is not found, return a 404 error
    if (!updatedDelivery) {
      res.status(404).json({ error: "Delivery not found" });
      return;
    }

    // Return the updated delivery object as a JSON response
    res.json(updatedDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
