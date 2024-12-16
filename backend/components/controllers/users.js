const UsersService = require('../services/users');
const jwt = require('jsonwebtoken');
const UserShema = require('../schemes/users');

class UsersController {
    async getRoleAndId(req, res, next)
    {
      try
      {
        const role = req.role;
        console.log("This is role");
        console.log(role);
        const id  = req.userID;
        console.log("This is id");
        console.log(id);

        res.json({Role : role, Id : id, message : "Пользователь успешно найден"});
      }
      catch(err)
      {
        console.log(err);
        return next(err);
      }
    }

    async registration( req, res, next) {
        try
        {
            let {role, firstname, lastname, patronymic, password, datebirth} = req.body;

            let data = req.body;
            console.log(data);

            const {error} = UserShema.registration.validate(data);

            if(error)
            {
              console.log(error);
              res.status(400).json( {message : "Валидация регистрационных данных провалилась", errors : error.details});
            }
            

            let userData = await UsersService.registration(
                role,
                lastname,
                firstname,
                patronymic,
                password,
                datebirth
            );

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json({body : userData, message: "Пользователь успешно зарегестрирован", statusCode: 200, accessToken: userData.accessToken} );
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async login( req, res, next) {
        try
        {
            let {lastname, firstname, patronymic, password} = req.body;

            let data = req.body;

            const {error} = UserShema.login.validate(data);

            if(error)
            {
              console.log(error);
              res.status(400).json( {message : "Валидация данных для аунтефикации провалилась",errors : error.details});
            }

            const userData = await UsersService.login
            (
                lastname,
                firstname,
                patronymic,
                password
            );
            
            res.cookie('refreshToken', userData.refreshToken,
            {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.cookie('accessToken', userData.accessToken,
            {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json({body : userData, message: "Аунтефикация прошла успешно", statusCode: 200 , accessToken: userData.accessToken,refreshToken : userData.refreshToken});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async logout( req, res, next) {
        try
        {
            let {id} = req.body;

            console.log(id);

            const {refreshToken} = req.cookies;
            console.log(refreshToken);
            const token = await UsersService.logout(refreshToken, id);
            console.log(token);
            res.clearCookie('refreshToken');
            return res.json({body : token, message : "Пользователь успешно вышел", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async refresh(req, res, next) {
        try {
          console.log("Start refresh");

          const { refreshToken } = req.body;

          console.log(refreshToken);
    
          const userData = await UsersService.refresh(refreshToken);

          console.log(userData);
    
          res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.cookie('accessToken', userData.accessToken,
            {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
    
          return res.json({body : userData, message : "Токен успешно обновлён", statusCode : 200, accessToken : userData.accessToken,refreshToken : userData.refreshToken});
        } catch (err) {
          return next(err);
        }
    }

    async search(req, res, next) {
        const param = req.query.param;
        const value = req.query.value;
        console.log(param);
        console.log(value);
        try {
          res.json({body : await UsersService.search(param, value), message : "Пользователь(и) был(и) успешно найден(ы)", statusCode : 200});
        } catch (err) {
          return next(err);
        }
    }

    async findById(req, res, next) {
        const UserId = req.userID;
    
        try {
          res.json({body : await UsersService.findById(UserId), message : "Пользователь успешно найден", statusCode : 200});
        } catch (err) {
          return next(err);
        }
    }

    async createUser(req, res, next) {
        const NewUserData = req.body;
        console.log('1');
        console.log(NewUserData);
    
        try {
          res.json(await UsersService.createUser(NewUserData));
        } catch (err) {
          return next(err);
        }
    }

    async list(req, res, next) {
        try {
          res.json({body : await UsersService.lists(), message : "Список пользователей успешно получен", statusCode : 200});
        } catch (err) {
          return next(err);
        }
    }

    async listMax(req, res, next)
    {
      try
      {
        res.json({body : await UsersService.listMax(), message : "Список самых успешных пользователей успешно получен", statusCode : 200});
      }
      catch(err)
      {
        console.log(err);
        return next(err);
      }
    }

    async delete(req, res, next) {
        try {
          const userId = req.params.id;
          console.log(userId);
    
          res.json({body : await UsersService.delete(userId), message : "Пользователь был успешно удалён" , statusCode : 200});
        } catch (err) {
          console.log(err);
          return next(err);
        }
    }

    async updateUser(req, res, next) {
        const UserId = req.params.id;
        const NewBody = req.body;
        console.log(UserId);
        console.log(NewBody);
    
        try {
          console.log('lol');
          res.json({body : await UsersService.updateUser(UserId, NewBody), message : "Пользователь был успешно изменён", statusCode : 200});
        } catch (err) {
          return next(err);
        }
    }
}

module.exports = new UsersController();