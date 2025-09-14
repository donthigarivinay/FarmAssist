import Dealer from "../models/Dealer.js";

// Get dealer profile
export const getDealerProfile = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.user.id).select("-password");
    res.json(dealer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update dealer profile
export const updateDealerProfile = async (req, res) => {
  try {
    const dealer = await Dealer.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
    res.json({ message: "Profile updated", dealer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
