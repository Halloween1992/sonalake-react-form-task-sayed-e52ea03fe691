import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FromTaskComplete from "./FormTaskComplete";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("FormTaskComplet", () => {
  // ***** Check if all inputs are in the dom *****
  it("🎉 Check if all inputs are in the dom 🎉", () => {
    render(<FromTaskComplete />);
    expect(
      //this are helpers fns that get elements, you can find the in the bottom
      getNameIput() &&
        getLastNameInput() &&
        getUserInactivityDate() &&
        getUerTypeInput()
    ).toBeInTheDocument();
  });

  describe("✨ Submit form ✨", () => {
    // ***** With valid inputs and inactive user type *****
    it("With valid inputs and 📍Inactive📍 user type", async () => {
      //Overwriting fetch fn to mock fn
      window.fetch = jest.fn();
      window.fetch.mockResolvedValueOnce({
        json: async () => ({
          name: "Sayed",
          lastName: "Anwary",
          dateOfBirth: "1991-12-25",
          userType: "Inactive",
          inactivityDate: "2022-05-25",
        }),
      });

      //arrange
      const { container } = render(<FromTaskComplete />);

      //act

      await act(async () => {
        fireEvent.change(getNameIput(), {
          target: { value: "sayed" },
        });
        fireEvent.blur(getNameIput());

        fireEvent.change(getLastNameInput(), {
          target: { value: "Anwary" },
        });
        fireEvent.blur(getLastNameInput());

        fireEvent.change(getUerTypeInput(), { target: { value: "Inactive" } });
        fireEvent.blur(getUerTypeInput());

        fireEvent.change(getUserInactivityDate(), {
          target: { value: "2022-05-25" },
        });
        fireEvent.blur(getUserInactivityDate());
      });

      await act(async () => {
        userEvent.click(getSubmitButton());
      });

      // Note: Somehow this expectations are not working for me.

      // expect(getNameError()).not.toBeInTheDocument();
      // expect(getLastNameError()).not.toBeInTheDocument();
      // expect(getInactivityDateError()).not.toBeInTheDocument();

      //So I had to find another solution, EXACT match
      expect(container.innerHTML).not.toMatch("please, provide your name");
      expect(container.innerHTML).not.toMatch("Please, provid your last name.");
      expect(container.innerHTML).not.toMatch(
        "please choose a date, in case the user type is inactive."
      );
    });

    // ***** With valid inputs and active user type *****
    it("With valid inputs and 📍Active📍 user type", async () => {
      //Overwriting fetch fn to mock fn
      window.fetch = jest.fn();
      window.fetch.mockResolvedValueOnce({
        json: async () => ({
          name: "John",
          lastName: "Doe",
          dateOfBirth: "1981-06-15",
          userType: "Active",
          inactivityDate: "",
        }),
      });

      //arrange
      const { container } = render(<FromTaskComplete />);

      //act
      await act(async () => {
        fireEvent.change(getNameIput(), {
          target: { value: "John" },
        });
        fireEvent.blur(getNameIput());

        fireEvent.change(getLastNameInput(), {
          target: { value: "Doe" },
        });
        fireEvent.blur(getLastNameInput());

        fireEvent.change(getUerTypeInput(), { target: { value: "Active" } });
        fireEvent.blur(getUerTypeInput());

        fireEvent.change(getUserInactivityDate(), {
          target: { value: "" },
        });
        fireEvent.blur(getUserInactivityDate());
      });

      await act(async () => {
        userEvent.click(getSubmitButton());
      });

      //assert
      expect(container.innerHTML).not.toMatch("please, provide your name");
      expect(container.innerHTML).not.toMatch("Please, provid your last name.");
      expect(container.innerHTML).not.toMatch(
        "please choose a date, in case the user type is inactive."
      );
    });

    // ***** With 'invalid' inputs and user type INACTIVE *****

    it("With 📍invalid📍 inputs and user type 📍Inactive📍.", async () => {
      //arrange
      render(<FromTaskComplete />);

      //act
      await act(async () => {
        fireEvent.change(getNameIput(), {
          target: { value: "" },
        });
        fireEvent.blur(getNameIput());

        fireEvent.change(getLastNameInput(), {
          target: { value: "" },
        });
        fireEvent.blur(getLastNameInput());

        fireEvent.change(getUerTypeInput(), { target: { value: "Inactive" } });
        fireEvent.blur(getUerTypeInput());

        // fireEvent.change(getUserInactivityDate(), {
        //   target: { value: "" },
        // });
        fireEvent.blur(getUserInactivityDate());
      });

      await act(async () => {
        userEvent.click(getSubmitButton());
      });

      //assert
      expect(getNameError()).toBeInTheDocument();
      expect(getLastNameError()).toBeInTheDocument();
      expect(getInactivityDateError()).toBeInTheDocument();
    });

    // ***** with invalid input and user type ACTIVE *****
    it("with 📍invalid📍 inputs and user type 📍Active📍 ", async () => {
      //arrange
      const { container } = render(<FromTaskComplete />);

      //act
      await act(async () => {
        fireEvent.change(getNameIput(), {
          target: { value: "" },
        });
        fireEvent.blur(getNameIput());

        fireEvent.change(getLastNameInput(), {
          target: { value: "" },
        });
        fireEvent.blur(getLastNameInput());

        fireEvent.change(getUerTypeInput(), { target: { value: "Active" } });

        fireEvent.blur(getUerTypeInput());

        fireEvent.change(getUserInactivityDate(), {
          target: { value: "" },
        });
        fireEvent.blur(getUserInactivityDate());
      });

      await act(async () => {
        userEvent.click(getSubmitButton());
      });

      //assert
      expect(getNameError()).toBeInTheDocument();
      expect(getLastNameError()).toBeInTheDocument();
      // expect(getInactivityDateError()).not.toBeInTheDocument();
      expect(container.innerHTML).not.toMatch(
        "please choose a date, in case the user type is inactive."
      );
    });

    // ***** A crazy user clicks the submit btn without even bothering to fill or touching the inputs 🤨 *****
    it("When user clicks the submit btn directly withtout filling or touching the inputs 🤨 ", async () => {
      //arrange
      const { container } = render(<FromTaskComplete />);

      await act(async () => {
        userEvent.click(getSubmitButton());
      });

      //assert

      expect(getNameError()).toBeInTheDocument();
      expect(getLastNameError()).toBeInTheDocument();

      //because by defualt 'user type' value is Active, so this error won't be the dom.
      expect(container.innerHTML).not.toMatch(
        "please choose a date, in case the user type is inactive."
      );
      // expect(getInactivityDateError()).not.toBeInTheDocument();
    });
  });

  // get elements helpers
  const getNameIput = () => {
    return screen.getByTestId("name input");
  };
  const getLastNameInput = () => {
    return screen.getByTestId("last name input");
  };
  const getUerTypeInput = () => {
    return screen.getByTestId("user type");
  };
  const getUserInactivityDate = () => {
    return screen.getByTestId("inactivity date");
  };

  const getSubmitButton = () => {
    return screen.getByRole("button", { target: { name: "Save" } });
  };

  //get errors
  const getNameError = () => {
    return screen.getByTestId("first name error");
  };
  const getLastNameError = () => {
    return screen.getByTestId("last name error");
  };
  const getInactivityDateError = () => {
    return screen.getByTestId("user inactivity date error");
  };
});
