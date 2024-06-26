import { gql } from "@apollo/client";

export const QUERY_TASKS = gql`
  query {
    tasks {
      _id
      username
      taskText
      taskStatus
      createdAt
      assignedID
      taskStatus
    }
  }
`;

export const QUERY_TASK = gql`
  query task($_id: ID!) {
    task(_id: $_id) {
      _id
      username
      assignedID
      taskText
      taskStatus
      createdAt
    }
  }
`;

export const QUERY_USERS_TASKS = gql`
  query usersTasks($assignedID: String!) {
    usersTasks(assignedID: $assignedID) {
      taskText
      taskStatus
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      tasks {
        taskText
        taskStatus
        assignedID
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      email
      messages {
        messageText
      }
      tasks {
        taskText
        username
        taskStatus
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      tasks {
        taskText
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query {
    tasks {
      _id
      username
      taskText
      taskStatus
      createdAt
      assignedID
      taskStatus
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query {
    messages {
      _id
      username
      messageText
      createdAt
    }
  }
`;

export const QUERY_MESSAGE = gql`
  query Message($id: ID!) {
    message(_id: $id) {
      messageText
      replies {
        replyBody
        username
        _id
      }
      username
      _id
    }
  }
`;
