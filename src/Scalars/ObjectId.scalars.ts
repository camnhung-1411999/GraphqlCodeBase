import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  parseValue(value: string) {
    return new ObjectId(value); // value from the client input variables
  },
  serialize(value: ObjectId) {
    if (value !== undefined || value !== '') {
      return value.toHexString(); // value sent to the client
    }
    return '';
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && ast.value !== '') {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  },
});
