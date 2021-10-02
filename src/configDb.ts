import { connect } from 'mongoose';

export default async function connectDb () {
	try {
		await connect('mongodb://localhost/graphqlBd')
		console.log('connected DataBase')
	} catch (err)  {
		console.log('ERROR !!!', err)
	}
}