const User = require("../models/user_model"); // Assuming you have a user model

describe("User Controller", () => {
  it("should fetch all users", async () => {
    const mockUsers = [
      { name: "John Doe", email: "johndoe@example.com" },
      { name: "Jane Smith", email: "janesmith@example.com" },
    ];
    jest.spyOn(User, "find").mockResolvedValue(mockUsers);

    const allUsers = await User.find().exec();

    expect(allUsers).toEqual(mockUsers);

    expect(User.find).toHaveBeenCalledTimes(1);

    User.find.mockRestore();
  });
});
