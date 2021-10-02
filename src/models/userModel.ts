import { model, Schema } from 'mongoose'

const schemaUser = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	age: {
		type: Number
	},
	married: {
		type: Boolean
	}
});

export default model('user', schemaUser)