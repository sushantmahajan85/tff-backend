const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLBoolean } = graphql

// Userbase
const Student = require('../schema/models/Student')

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLNonNull(GraphQLString)},
        rollNumber: {type: GraphQLNonNull(GraphQLString)},
        numBottles: {type: GraphQLNonNull(GraphQLInt)},
        code: {type: GraphQLNonNull(GraphQLString)},
        dateJoined: {type: GraphQLNonNull(GraphQLString)}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        students: {
            type: GraphQLList(StudentType),
            resolve(parent, args) {
                return Student.find()
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                rollNumber: {type: GraphQLNonNull(GraphQLString)},
                numBottles: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                var code = name.substring(0, 4)
                var sampleSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                for (var i =0 ; i < 4; i++) {
                    code += sampleSet[Math.floor(Math.random() * 10)]
                }
                const student = new Student({
                    name: args.name,
                    rollNumber: args.rollNumber,
                    numBottles: args.numBottles,
                    code: code,
                    dateJoined: new Date().toDateString()
                })
                return student.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})