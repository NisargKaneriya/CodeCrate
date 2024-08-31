// Importing required modules
import mongoose from 'mongoose';

// Creating the User Schema
const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 8,
		},
		profilePic: {
			type: String,
			default: "https://picsum.photos/100",
		}
	},
	{ timestamps: true }
);

// Exporting our model
const user = mongoose.model('User', userSchema);
export default user;