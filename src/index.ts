import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import connectDb from './configDb'
import modelUser from './models/userModel'

const typeDefs = gql`
	type Query {
		getUsers: [user]
		getUser(id: String): user
	}
	type Mutation {
		createUser(dataUser: UserCreate): Boolean
		updateUser(id: String, dataUser: UserCreate): Boolean
		deleteUser(id: String): Boolean
	}
	input UserCreate {
		name: String
		email: String
		password: String
		age: Int
		married: Boolean
	}
	type user {
		name: String
		email: String
		password: String
		age: Int
		married: Boolean	
	}
`;

const resolvers = {
	Query: {
		getUsers: async () => {
			try {
				const userFind = await modelUser.find({})
				return userFind
			} catch (err) {
				console.log(err)
			}
		},
		getUser: async (_: any, params: any) => {
			try {
				const id = params.id; 
				const getUser = await modelUser.findOne({ _id : id})
				return getUser
			} catch (err) {
				console.log(err)
			}
		}
	},
	Mutation: {
		createUser: async (_: any, params: any) => {
			try {
				const data = params.dataUser;
				const userModel = new modelUser(data)
				await userModel.save()

				return true
			} catch (err) {
				console.log(err)
				return false
			}
		},
		updateUser: async (_: any, params: any) => {
			try {
				const id = params.id;
				const dataUser = params.dataUser;
				await modelUser.findOneAndUpdate({_id: id}, dataUser)

				return true
			} catch (err) {
				console.log(err)
				return false
			}

		},
		deleteUser: async (_: any, params: any) => {
			try {
				const id = params.id;
				await modelUser.findOneAndDelete({ _id: id })
				return true
			} catch (err) {
				console.log(err)
				return false
			}
		}
	}
}

connectDb()

async function listenServer () {
	const server = new ApolloServer({ typeDefs, resolvers })
	const app = express();
	await server.start()

	server.applyMiddleware({ app })

	app.listen({ port: 4000 }, () =>
	  console.log('listen in http://localhost:4000' + server.graphqlPath)
	);
}

listenServer()