import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestModule } from '../src/test.module';
import { UserDto } from '../src/user/user.dto';
import { UserService } from '../src/user/user.service';

describe('User Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    await userService.deleteMany({}); // delete all businesscards.
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    userService = moduleFixture.get(UserService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Post User Controller', () => {
    it('should create new valid user', async () => {
      // Arrange
      const user = new UserDto(
        'Sarah',
        'Johnson',
        'hello123',
        'sarah@johnson.com',
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/user')
        .send(user)
        .expect(201);
      console.log(result);

      // Assert
      const res = result.body;
      expect(res._id).toBeDefined();
      expect(res.__v).toEqual(0);
    });

    it('should return error when invalid data is passed on create', async () => {
      // Arrange
      const user = new UserDto('Sarah', 'Johnson', 'hello123', 'sarah');

      // Act
      const result = await request(app.getHttpServer())
        .post('/user')
        .send(user)
        .expect(400);

      // Assert
      const res = result.body;
      expect(res.message[0]).toEqual('email must be an email');
    });

    it('should find and return user by email and passowrd', async () => {
      // Arrange
      const userToBeCreated = new UserDto(
        'Line',
        'Jensen',
        'hello123',
        'line@junsen.com',
      );
      await userService.createUser(userToBeCreated);

      // Act
      const result = await request(app.getHttpServer())
        .post('/user/signin')
        .send({ email: 'line@junsen.com', password: 'hello123' })
        .expect(201);

      //Assert (expect)
      const res = result.body;
      console.log(res);
      expect.objectContaining({
        firstName: 'Line',
        lastName: 'Jensen',
        password: 'hello123',
        email: 'line@junsen.com',
      });
    });

    it('should return error when email could not be found', async () => {
      // Arrange
      const userToBeCreated = new UserDto(
        'Line',
        'Jensen',
        'hello123',
        'line@jensen.com',
      );
      await userService.createUser(userToBeCreated);

      // Act
      const result = await request(app.getHttpServer())
        .post('/user/signin')
        .send({ email: 'line@stevenson.com', password: 'hello123' })
        .expect(201);

      //Assert (expect)
      const res = result.body;
      expect(res).toStrictEqual({});
    });

    it('should return error when firstName field is empty', async () => {
      // Arrange
      const user = new UserDto('', 'Creene', 'hello123', 'vera@creene.com');

      // Act
      const result = await request(app.getHttpServer())
        .post('/user')
        .send(user)
        .expect(400);

      // Assert
      const res = result.body;
      expect(res.message[0]).toEqual('firstName should not be empty');
    });
  });

  describe('Delete User Controller', () => {
    it('should delete user by id', async () => {
      // Arrange
      const userQuery = new UserDto(
        'Vera',
        'Creene',
        'hello123',
        'vera@creene.com',
      );
      const user = await userService.createUser(userQuery);
      console.log(user);

      // Act
      const result = await request(app.getHttpServer())
        .delete(`/user/${user._id}`)
        .expect(200);

      // Assert
      const res = result.body;
      expect(res.acknowledged).toEqual(true);
    });

    it('should return error when id is empty on delete', async () => {
      // Arrange
      const id = '';

      // Act
      const result = await request(app.getHttpServer())
        .delete(`/user/${id}`)
        .expect(404);

      // Assert
      const res = result.body;
      expect(res.error).toEqual('Not Found');
    });
  });

  describe('Put User Controller', () => {
    it('should update user with given id and user dto', async () => {
      // Arrange
      const userQuery = new UserDto(
        'Vera',
        'Creene',
        'hello123',
        'vera@creene.com',
      );
      const user = await userService.createUser(userQuery);
      console.log(user);

      const newUserData = {
        firstName: 'Vera',
        lastName: 'Creene',
        password: 'hello123',
        email: 'vera@creene.dk',
        phoneNumber: '51925887',
        picture: 'vera.jpg',
        description: 'vera bio',
      };

      // Act
      const result = await request(app.getHttpServer())
        .put(`/user/${user._id}`)
        .send(newUserData)
        .expect(200);

      // Assert
      const res = result.body;
      expect(res.acknowledged).toEqual(true);
    });

    it('should return error if passed id is empty', async () => {
      // Arrange
      const newUserData = {
        firstName: 'Vera',
        lastName: 'Creene',
        password: 'hello123',
        email: 'vera@creene.dk',
        phoneNumber: '51925887',
        picture: 'vera.jpg',
        description: 'vera bio',
      };

      const id = '';

      // Act
      const result = await request(app.getHttpServer())
        .put(`/user/${id}`)
        .send(newUserData)
        .expect(404);

      // Assert
      const res = result.body;
      expect(res.error).toEqual('Not Found');
    });

    it('should return error when instrument title is empty', async () => {
      // Arrange
      const userQuery = new UserDto(
        'Vera',
        'Creene',
        'hello123',
        'vera@creene.com',
      );
      const user = await userService.createUser(userQuery);
      console.log(user);

      const newUserData = {
        firstName: 'Vera',
        lastName: 'Creene',
        password: 'hello123',
        email: 'vera@creene.dk',
        phoneNumber: '51925887',
        picture: 'vera.jpg',
        description: 'vera bio',
        instruments: [{ title: '', genres: ['Barok', 'Folkemusik'] }],
      };

      // Act
      const result = await request(app.getHttpServer())
        .put(`/user/${user._id}`)
        .send(newUserData)
        .expect(400);

      // Assert
      const res = result.body;
      expect(res.message[0]).toEqual('instruments.0.title should not be empty');
    });

    it('should return error when instrument genres is empty', async () => {
      // Arrange
      const userQuery = new UserDto(
        'Vera',
        'Creene',
        'hello123',
        'vera@creene.com',
      );
      const user = await userService.createUser(userQuery);
      console.log(user);

      const newUserData = {
        firstName: 'Vera',
        lastName: 'Creene',
        password: 'hello123',
        email: 'vera@creene.dk',
        phoneNumber: '51925887',
        picture: 'vera.jpg',
        description: 'vera bio',
        instruments: [{ title: 'Violin', genres: [] }],
      };

      // Act
      const result = await request(app.getHttpServer())
        .put(`/user/${user._id}`)
        .send(newUserData)
        .expect(400);

      // Assert
      const res = result.body;
      expect(res.message[0]).toEqual(
        'instruments.0.genres must contain at least 1 elements',
      );
    });
  });

  //Closing app after all tests => not hanging.
  afterAll(() => {
    app.close();
  });
});
