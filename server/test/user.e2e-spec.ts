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
        .send(user);
      console.log(result);
      // .expect(201);

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
        .expect(200);

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
        .expect(200);

      //Assert (expect)
      const res = result.body;
      expect(res).toStrictEqual({});
    });
  });

  //Closing app after all tests => not hanging.
  afterAll(() => {
    app.close();
  });
});
