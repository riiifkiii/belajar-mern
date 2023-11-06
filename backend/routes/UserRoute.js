import express from "express";
import userSchema from "../models/UserModels.js";

const router = express.Router();

router.route("/").get(async (req, res, next) => {
	try {
		const data = await userSchema.find();
		res.json(data);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

router.route("/").post(async (req, res, next) => {
	const newUser = new userSchema(req.body);
	try {
		await newUser.save();
		res.status(200).json(await userSchema.find());
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: error.message });
	}
});

router.route("/:id").delete(async (req, res) => {
	const id = req.params.id;
	try {
		await userSchema.deleteOne({ _id: id });
		res.json(await userSchema.find());
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Data gagal dihapus" });
	}
});

router.route("/:id").put(async (req, res) => {
	const id = req.params.id;
	const filter = {
		_id: id,
	};
	const data = {
		$set: req.body,
	};
	try {
		await userSchema.updateOne(filter, data);
		res.json(await userSchema.find());
	} catch (error) {
		console.log(error);
	}
});

export default router;
