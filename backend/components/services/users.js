const Users = require('../repository/users');
const TokensService = require('../services/tokens');
const bcrypt = require('bcrypt');
const ApiError = require('../errors/ApiError');
const { ref } = require('joi');

class UsersService {
  async registration(role, lastname, firstname, patronymic,password, datebirth) {
    console.log(role, lastname, firstname, patronymic, role, password, datebirth);

    const candidate = await Users.searchForRegistration(
      lastname,
      firstname,
      patronymic,
    );

    if (candidate) {
      throw ApiError.BadRequest('Пользователь уже существует');
    }

    const newPassword = await Users.hashpassword(password);

    const User = await Users.registration(
      role,
      lastname,
      firstname,
      patronymic,
      newPassword,
      datebirth,
    );

    const NewRole = User.role;
    const NewId = User.id;

    const tokens = TokensService.generateTokens({NewRole, NewId});
    console.log('----------------------');
    console.log(tokens.refreshToken);
    console.log('----------------------');
    console.log(User.id);
    console.log('----------------------');
    await TokensService.saveToken(User.id, tokens.refreshToken);

    return { ...tokens, User };
  }

  async login(lastname, firstname, patronymic,password) {
    const user = await Users.searchForRegistration(
      lastname,
      firstname,
      patronymic,
    );
    console.log(user);
    if (!user) {
      throw ApiError.BadRequest(
        'Пользователь с заданными параметрами не найден.',
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    console.log(password);
    console.log(user.password);
    console.log(user.lastname);
    console.log(isPassEquals);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Введён неккоректный пароль.');
    }

    const NewRole = user.role;
    const NewId = user.id;

    const tokens = TokensService.generateTokens({ NewRole, NewId });
    console.log('----------------------');
    console.log(tokens.refreshToken);
    console.log('----------------------');
    console.log(user.id);
    console.log('----------------------');
    await TokensService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(refreshToken, id) {
    const token = await TokensService.removeToken(refreshToken, id);
    return token;
  }

  async refresh(refreshToken1) {
    if (!refreshToken1) {
      throw ApiError.UnathorizedError();
    }

    const refreshToken = refreshToken1.split(' ')[1];
    console.log(refreshToken);

    const userData = TokensService.validateRefreshToken(refreshToken);
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log(userData);
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log(userData.NewId);
    const tokenFromDb = await TokensService.findToken(userData.NewId);
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log(tokenFromDb);
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log("///////////////////////////////////////////////////////////////////////////////");

    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }

    console.log(userData.NewId);
    const User = await Users.findById(userData.NewId);
    console.log(User);
    const NewRole = User.role;
    const NewId = User.id;
    const tokens = TokensService.generateTokens({NewRole, NewId});
    console.log('----------------------');
    console.log(tokens.refreshToken);
    console.log('----------------------');
    console.log(User.id);
    console.log('----------------------');
    await TokensService.saveToken(User.id, tokens.refreshToken);

    return { ...tokens, User };
  }

  // async hashpassword(password)
  // {
  //     return await bcrypt.hash(password, 5);
  // }

  // async searchForRegistration(lastname,firstname, patronymic)
  // {
  //     return await Users.searchForRegistration(lastname,firstname,patronymic);
  // }

  async search(param, value) {
    console.log(param);
    console.log(value);
    return await Users.search(param, value);
  }

  async findById(UserId) {
    console.log(UserId);
    return await Users.findById(UserId);
  }

  async createUser(NewUserData) {
    return await Users.createUser(NewUserData);
  }

  async lists() {
    console.log('33333');
    return await Users.lists();
  }

  async listMax()
  {
    const users = await Users.listMax();

    if(!users)
    {
      throw ApiError.BadRequest("Не удалось вывести упорядоченный список Users.");
    }

    let arrUsers = [];

    for( let i = 0; i < users.length; i++)
    {
      let id = users[i].id;
      let role = users[i].role;
      let lastname = users[i].lastname;
      let firstname = users[i].firstname;
      let patronymic = users[i].patronymic;
      let datebirth = users[i].datebirth;
      let earned = users[i].earned;
      let raiting = i + 1;
      let bodyUsers = {id, role, lastname, firstname, patronymic, datebirth, earned, raiting};
      arrUsers.push(bodyUsers);
    }

    return arrUsers;
  }

  async delete(id) {
    console.log(id);
    return await Users.delete(id);
  }

  async updateUser(UserId, NewBody) {
    console.log('lol');
    return await Users.updateUser(UserId, NewBody);
  }

  async changePassword(id, password) {
    return await Users.changePassword(id, password);
  }
}

module.exports = new UsersService();
