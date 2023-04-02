import User from "../src/user/user.model.js";

export const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await User.findOne({ _id: customerId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error getting customer data" });
  }
};
