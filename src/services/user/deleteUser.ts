import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErros";

const deleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });
  if (!findUser) {
    throw new AppError("Id não encontrado", 404);
  }
  if (!findUser.isActive) {
    throw new AppError("usuario não existe", 400);
  }

  findUser.isActive = false;

  await userRepository.save(findUser);
};

export default deleteUserService;
