import mongoose from "mongoose";

const User = new mongoose.Schema({
	user: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
});

export default mongoose.model("users", User);
