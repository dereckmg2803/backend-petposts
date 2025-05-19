import { encryptAdapter } from "../../../config/bcrypt.adapter";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { User } from "../../../data";
import { CustomError } from "../../../domain";

export class CreatorUserService {
  async execute(data: any) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = encryptAdapter.hash(data.password)// Asegúrate de hashearla si es necesario
    user.role = data.role || "user";

    try {
      await user.save();
      return {
        message: "User created successfully",
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw CustomError.internalServer("Error creating user");
    }
  }

  private sendLinkToEmailFronValidationAccount = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email }, '300s');
    if (!token) throw CustomError.internalServer('Error gettin token');

    const link = `http://localhost:3000/api/v1/users/validate-account/${token}`;
    console.log(link);
  };

  public validateAccount = async (token: string) => {
    const payload = await this.validateToken(token);

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer('Email not found in token');

    const user = await this.ensureUserExistWhitEmail(email);

    user.status = true;

    try {
      await user.save();
      return 'user activated';
    } catch (error) {
      throw CustomError.internalServer('Something went very wrong');
    }
  };

  private async ensureUserExistWhitEmail(email: string) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw CustomError.internalServer('Email no registered in db');
    }
    return user;
  }

  private async validateToken(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.badRequest('Invalid Token');
    return payload;
  }

}
