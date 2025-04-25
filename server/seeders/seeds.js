import models from '../models/index.js';
import { hash } from 'bcrypt';
import { runDBClient } from '../connection/index.js';

const { User, Task, Message } = models;

export const seedDatabase = async() => {
  try {
    await runDBClient();

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Task.deleteMany({});
    await Message.deleteMany({});

    console.log('Creating users...');
    const createdUsers = [];
    for (const user of userData) {
      const hashedPassword = await hash(user.password, 10);
      const createdUser = await User.create({
        username: user.username,
        email: user.email,
        password: hashedPassword
      });
      createdUsers.push(createdUser);
    }
    console.log('Creating tasks...');
    const createdTasks = [];
    for (let i = 0; i < taskData.length; i++) {
      const assignedUser = createdUsers[i % createdUsers.length];
      
      const task = await Task.create({
        taskText: taskData[i].taskText,
        taskStatus: taskData[i].taskStatus,
        username: assignedUser.username,
        assignedID: assignedUser._id
      });
      
      createdTasks.push(task);
      
      await User.findByIdAndUpdate(
        assignedUser._id,
        { $push: { tasks: task._id } },
        { new: true }
      );
    }

    console.log('Creating messages and replies...');
    for (let i = 0; i < messageData.length; i++) {
      const messageUser = createdUsers[i % createdUsers.length];
      
      const messageToCreate = {
        messageText: messageData[i].messageText,
        username: messageUser.username,
        replies: []
      };
      
      if (messageData[i].replies && messageData[i].replies.length > 0) {
        for (let j = 0; j < messageData[i].replies.length; j++) {
          const replyUserIndex = (i + j + 1) % createdUsers.length;
          
          messageToCreate.replies.push({
            replyBody: messageData[i].replies[j].replyBody,
            username: createdUsers[replyUserIndex].username
          });
        }
      }
      
      const message = await Message.create(messageToCreate);
      
      await User.findByIdAndUpdate(
        messageUser._id,
        { $push: { messages: message._id } },
        { new: true }
      );
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

const userData = [
  {
    username: 'alex_carter',
    email: 'alex@email.com',
    password: 'password123'
  },
  {
    username: 'taylor_morgan',
    email: 'taylor@email.com',
    password: 'password123'
  },
  {
    username: 'jordan_riley',
    email: 'jordan@email.com',
    password: 'password123'
  },
  {
    username: 'casey_quinn',
    email: 'casey@email.com',
    password: 'password123'
  },
  {
    username: 'morgan_smith',
    email: 'morgan@email.com',
    password: 'password123'
  }
];

const taskData = [
  {
    taskText: 'Clean the kitchen',
    taskStatus: false,
    assignedID: null // Will be assigned after users are created
  },
  {
    taskText: 'Take out trash',
    taskStatus: true,
    assignedID: null
  },
  {
    taskText: 'Pay electric bill - $124.50 due Friday',
    taskStatus: false,
    assignedID: null
  },
  {
    taskText: 'Buy more dish soap and paper towels',
    taskStatus: false,
    assignedID: null
  },
  {
    taskText: 'Schedule plumber for leaky bathroom sink',
    taskStatus: false,
    assignedID: null
  },
  {
    taskText: 'Clean common area before weekend party',
    taskStatus: false,
    assignedID: null
  },
  {
    taskText: 'Fix WiFi router - keeps disconnecting',
    taskStatus: true,
    assignedID: null
  },
  {
    taskText: 'Mow the lawn',
    taskStatus: false,
    assignedID: null
  },
  {
    taskText: 'Organize recycling',
    taskStatus: false,
    assignedID: null
  },
  {
    taskText: 'Call landlord about AC issues',
    taskStatus: false,
    assignedID: null
  }
];

const messageData = [
  {
    messageText: "Hey everyone, I'm hosting a small dinner this Friday at 7. Let me know if you'll be around!",
    username: null, // Will be filled after users are created
    replies: [
      {
        replyBody: "I'll be there! Can I bring anything?",
        username: null
      },
      {
        replyBody: "Count me in! Thanks for organizing.",
        username: null
      },
      {
        replyBody: "Sorry, I have plans that night. Have fun!",
        username: null
      }
    ]
  },
  {
    messageText: "Is anyone free to help me move my new desk upstairs tomorrow afternoon?",
    username: null,
    replies: [
      {
        replyBody: "I can help after 4pm!",
        username: null
      },
      {
        replyBody: "Sorry, working late tomorrow.",
        username: null
      },
      {
        replyBody: "I'll be around, just text me when you need me.",
        username: null
      },
      {
        replyBody: "That thing looks heavy, let's ask the neighbors too.",
        username: null
      }
    ]
  },
  {
    messageText: "Reminder: Rent is due this Monday! Don't forget to transfer your share.",
    username: null,
    replies: [
      {
        replyBody: "Already sent mine!",
        username: null
      },
      {
        replyBody: "Thanks for the reminder, doing it now.",
        username: null
      },
      {
        replyBody: "I'll be transferring mine on Sunday.",
        username: null
      },
      {
        replyBody: "Can I pay you in cash this month? My bank account is having issues.",
        username: null
      },
      {
        replyBody: "Got it, thanks for the heads up.",
        username: null
      }
    ]
  },
  {
    messageText: "Did anyone take my leftover pizza from the fridge? It was in the blue container...",
    username: null,
    replies: [
      {
        replyBody: "Oops, that was me! Sorry, I thought it was from two days ago. I'll buy you a new one!",
        username: null
      },
      {
        replyBody: "The great pizza mystery solved!",
        username: null
      },
      {
        replyBody: "This is why we need name labels on everything 😂",
        username: null
      }
    ]
  }
];


