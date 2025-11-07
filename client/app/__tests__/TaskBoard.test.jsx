import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TaskBoard from "../../src/components/TaskBoard/index";
import { useQuery, useMutation } from "@apollo/client";
import AuthService from "../../src/utils/auth";
jest.mock("../../src/utils/auth");

jest.mock("@apollo/client", () => {
  return {
    gql: jest.fn(),
    useQuery: jest.fn(),
    useMutation: jest.fn(),
  };
});

const mockTaskDataResponse = {
    tasks: [
      {
        _id: "69069f165335b0c17c5ddbe0",
        taskText: "Schedule plumber for leaky bathroom sink",
        username: "morgan_smith",
        taskStatus: false,
        assignedID: "69069f165335b0c17c5ddbca",
        createdAt: "Nov 1st, 2025 at 8:0 pm",
      },
      {
        _id: "69069f165335b0c17c5ddbeb",
        taskText: "Fix WiFi router - keeps disconnecting",
        username: "taylor_morgan",
        taskStatus: true,
        assignedID: "69069f165335b0c17c5ddbc4",
        createdAt: "Nov 1st, 2025 at 8:0 pm",
      },
    ],
};

const deleteTaskReponse = {
  data: {
    deleteTask: {
      _id: "69069f165335b0c17c5ddbe0",
      assignedID: "69069f165335b0c17c5ddbca",
      createdAt: "Nov 1st, 2025 at 8:0 pm",
      taskStatus: false,
      taskText: "Schedule plumber for leaky bathroom sink",
      username: "morgan_smith",
      __typename: "Task",
    },
  },
};

describe("TaskBoard", () => {
  beforeEach(() => {
    AuthService.loggedIn.mockReturnValue({
        _id: "user123",
        username: "testuser",
    });
    useQuery.mockReturnValue({
      data: mockTaskDataResponse,
      loading: false,
      error: null,
    });
    useMutation.mockReturnValue([
      jest.fn(),
      {
        data: deleteTaskReponse,
        loading: false,
        error: null,
      },
    ]);
  });

  it("renders tasks when data is present", () => {
    render(<TaskBoard />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    
    expect(screen.getByText("Schedule plumber for leaky bathroom sink")).toBeInTheDocument();
    expect(screen.getByText("Fix WiFi router - keeps disconnecting")).toBeInTheDocument();
  });
});
