const UserAuth = require("../models/userauth");
const User = require("../models/user");

describe("UserAuth Controller", () => {
  it("should find a user by email and populate the userid field", async () => {
    const email = "johndoe@example.com";
    const mockUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      userid: "123",
    };
    jest.spyOn(UserAuth, "findOne").mockResolvedValue(mockUser);
    const populateSpy = jest.spyOn(UserAuth, "populate").mockReturnThis();
    const execSpy = jest.spyOn(UserAuth, "exec").mockResolvedValue(mockUser);

    const user = await UserAuth.findOne({ email }).populate("userid").exec();

    expect(user).toEqual(mockUser);
    expect(UserAuth.findOne).toHaveBeenCalledWith({ email });
    expect(populateSpy).toHaveBeenCalledWith("userid");
    expect(execSpy).toHaveBeenCalledTimes(1);

    UserAuth.findOne.mockRestore();
    populateSpy.mockRestore();
    execSpy.mockRestore();
  });
});
