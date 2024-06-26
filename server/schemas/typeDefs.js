// create our typeDefs
const typeDefs = `#graphql
  type Query {
    applicationPassword: Boolean
    me: User
    users: [User]
    user(username: String!): User
    tasks: [Task]
    usersTasks(assignedID: String!): [Task]
    task(_id: ID!): Task
    messages: [Message]
    message(_id: ID!): Message
  }

  type Message {
    _id: ID
    messageText: String
    createdAt: String
    username: String
    replyCount: Int
    replies: [Reply]
  }

  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    podID: [Pod]
    friendCount: Int
    tasks: [Task]
    messages: [Message]
  }

  type Task {
    _id: ID
    taskText: String
    podID: [Pod]
    username: String
    taskStatus: Boolean
    assignedID: String
    createdAt: String
  }

  type Pod {
    _id: ID
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    addTask(taskText: String!): Task
    deleteTask(_id: ID!): Task
    updateTask(_id: ID!, taskStatus: Boolean, assignedID: ID): Task
    addMessage(messageText: String!): Message
    addReply(messageId: ID!, replyBody: String!): Message
    addFriend(friendId: ID!): User
    deleteMessage(_id: ID!): Message
  }

  type Auth {
    token: ID!
    user: User
  }
`;

export default typeDefs;
