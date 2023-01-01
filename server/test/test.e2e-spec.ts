import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { UserService } from '../src/user/user.service';
import { CreateUserDto } from '../src/user/create-user.dto';
import { OrchestraService } from '../src/orchestra/orchestra.service';
import { LoginDto } from '../src/auth/login.dto';
import { OrchestraDto } from '../src/orchestra/orchestra.dto';

describe('End-2-end testing', () => {
  let app: INestApplication;
  let userService: UserService;
  let orchestraService: OrchestraService;

  beforeEach(async () => {
    await userService.deleteMany({}); // delete all users.
    await orchestraService.deleteMany({}); // delete all orchestra.
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    userService = moduleFixture.get(UserService);
    orchestraService = moduleFixture.get(OrchestraService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory(errors: ValidationError[]) {
          return new UnprocessableEntityException(errors);
        },
      }),
    );
    await app.init();
  });

  describe('User Controller', () => {
    describe('Post User Controller', () => {
      it('should create new valid user', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Sarah',
          'Johnson',
          'hello123',
          'sarah@johnson.com',
        );
        // Act
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);
        // Assert
        const res = newUserResponse.body.user;
        expect(res._id).toBeDefined();
        expect(res.__v).toEqual(0);
      });

      it('should return error when invalid data is passed on create', async () => {
        // Arrange
        const user = new CreateUserDto('Sarah', 'Johnson', 'hello123', 'sarah');

        // Act
        const result = await request(app.getHttpServer())
          .post('/user')
          .send(user)
          .expect(422);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Unprocessable Entity');
      });

      it('should find and return user by email and passowrd', async () => {
        // Arrange
        const userToBeCreated = new CreateUserDto(
          'Line',
          'Jensen',
          'hello123',
          'line@jensen.com',
        );
        await userService.createUser(userToBeCreated);

        // Act
        const loginDto = new LoginDto('line@jensen.com', 'hello123');
        const result = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        //Assert (expect)
        const res = result.body;
        expect(res.success).toBe(true);
        // expect.objectContaining({
        //   firstName: 'Line',
        //   lastName: 'Jensen',
        //   password: 'hello123',
        //   email: 'line@jensen.com',
        // });
      });

      it('should return error when email could not be found', async () => {
        // Arrange
        const userToBeCreated = new CreateUserDto(
          'Line',
          'Jensen',
          'hello123',
          'line@jensen.com',
        );
        await userService.createUser(userToBeCreated);

        // Act
        const loginDto = new LoginDto('line@stevenson.com', 'hello123');
        const result = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(401);

        //Assert (expect)
        const res = result.body;
        expect(res.success).toBe(false);
        expect(res.message).toEqual(
          'Kunne ikke finde bruger med disse legitimationsoplysninger. Tjek om e-mail og adgangskode er korrekte.',
        );
      });

      it('should return error when firstName field is empty', async () => {
        // Arrange
        const user = new CreateUserDto(
          '',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // Act
        const result = await request(app.getHttpServer())
          .post('/user')
          .send(user)
          .expect(422);
        // Assert
        const res = result.body;
        expect(res.error).toEqual('Unprocessable Entity');
      });
    });

    describe('Delete User Controller', () => {
      it('should delete user by id', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

        // Act
        const result = await request(app.getHttpServer())
          .delete(`/user/${newUserResponse.body.user._id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        // Assert
        const res = result.body;
        expect(res.acknowledged).toEqual(true);
      });

      it('should return error when id is empty on delete', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;
        const id = '';

        // Act
        const result = await request(app.getHttpServer())
          .delete(`/user/${id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Not Found');
      });
    });

    describe('Put User Controller', () => {
      it('should update user with given id and user dto', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

        const newUserData = {
          firstName: 'Vera',
          lastName: 'Creene',
          password: 'hello123',
          email: 'vera@creene.dk',
          phoneNumber: '51925887',
          description: 'vera bio',
        };

        // Act
        const result = await request(app.getHttpServer())
          .put(`/user/${newUserResponse.body.user._id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(newUserData)
          .expect(200);

        // Assert
        const res = result.body;
        expect(res.acknowledged).toEqual(true);
      });

      it('should return error if passed id is empty', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

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
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(newUserData)
          .expect(404);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Not Found');
      });

      it('should return error when instrument title is empty', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

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
          .put(`/user/${newUserResponse.body.user._id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(newUserData)
          .expect(422);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Unprocessable Entity');
      });

      it('should return error when instrument genres is empty', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

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
          .put(`/user/${newUserResponse.body.user._id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(newUserData)
          .expect(422);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Unprocessable Entity');
      });
    });
  });

  describe('Orchestra Controller', () => {
    describe('Post orchestra Controller', () => {
      it('should not create new valid orchestra with out loggedIn user', async () => {
        // Arrange
        const orchestra = new OrchestraDto(
          'Copenhagen Ensemble',
          'creator_id',
          'description',
          'www.google.com',
          '3050',
          'London',
          '10 - 24',
          'once a week',
          [],
        );

        // Act
        const result = await request(app.getHttpServer())
          .post('/orchestra')
          .send(orchestra)
          .expect(401);
        // Assert
        const res = result.body;
        expect(res.message).toEqual('Unauthorized');
      });

      it('should return error when invalid data is passed on create', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

        const orchestraQuery = new OrchestraDto(
          '',
          `${newUserResponse.body.user._id}`,
          'description',
          'www.google.com',
          '3050',
          'London',
          '10-20',
          'once a week',
          ['Barok'],
        );

        // Act
        const result = await request(app.getHttpServer())
          .post('/orchestra')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(orchestraQuery)
          .expect(422);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Unprocessable Entity');
      });
    });

    describe('Delete Orchestra Controller', () => {
      it('should return NOT FOUND when user tries to delete orchestra that does not exist (with orchestra id)', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

        const orchestraQuery = new OrchestraDto(
          'London Ensemble',
          `${newUserResponse.body.user._id}`,
          'description',
          'www.google.com',
          '3050',
          'London',
          '10-20',
          'once a week',
          ['Barok'],
        );

        // create new orchestra while setting authorization token in headers
        const newOrchestraResponse = await request(app.getHttpServer())
          .post('/orchestra')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(orchestraQuery)
          .expect(201);

        // Act
        const result = await request(app.getHttpServer())
          .delete(`/orchestra/${newOrchestraResponse.body.user._id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);

        // Assert
        const res = result.body;
        // expect(res.acknowledged).toEqual(true);
        expect(res.message).toEqual('Could not find the orchestra');
      });

      it('should return error when id is empty on delete', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.accessToken;
        const id = '';

        // Act
        const result = await request(app.getHttpServer())
          .delete(`/orchestra/${id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Not Found');
      });
    });

    describe('Put Orchestra Controller', () => {
      it('should return NOT FOUND when user tries to update orchestra that does not exist (with orchestra id and orchestra dto)', async () => {
        // Arrange
        const userQuery = new CreateUserDto(
          'Vera',
          'Creene',
          'hello123',
          'vera@creene.com',
        );
        // create user with _id
        const newUserResponse = await request(app.getHttpServer())
          .post('/user')
          .send(userQuery)
          .expect(201);

        const loginDto = new LoginDto('vera@creene.com', 'hello123');

        // sign user in and get jwt token
        const tokenResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDto)
          .expect(200);

        const jwtToken = tokenResponse.body.user.token;

        const orchestraQuery = new OrchestraDto(
          'London Ensemble',
          `${newUserResponse.body.user._id}`,
          'description',
          'www.google.com',
          '3050',
          'London',
          '10-20',
          'once a week',
          ['Barok'],
        );

        // create new orchestra while setting authorization token in headers
        const newOrchestraResponse = await request(app.getHttpServer())
          .post('/orchestra')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(orchestraQuery)
          .expect(201);

        const updatedOrchestra = {
          title: 'NewYork Ensemble',
          creator_id: `${newUserResponse.body.user._id}`,
          description: 'updated_description',
          website: 'business.dk',
          zipcode: '5170',
          city: 'New York',
          musicians_amount: '5-15',
          practice_frequency: 'twice a week',
          genres: ['Barok'],
        };

        // Act
        const result = await request(app.getHttpServer())
          .put(`/orchestra/${newOrchestraResponse.body.user._id}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(updatedOrchestra)
          .expect(404);

        // Assert
        const res = result.body;
        // expect(res.acknowledged).toEqual(true);
        expect(res.message).toEqual('Could not find the orchestra');
      });

      it('should return error if passed id is empty', async () => {
        // Arrange
        const updatedOrchestra = {
          title: 'NewYork Ensemble',
          creator_id: 'creator_id',
          description: 'updated_description',
          website: 'business.dk',
          zipcode: '5170',
          city: 'New York',
          musicians_amount: '5-15',
          practice_frequency: 'twice a week',
          genres: [],
        };

        const id = '';

        // Act
        const result = await request(app.getHttpServer())
          .put(`/orchestra/${id}`)
          .send(updatedOrchestra)
          .expect(404);

        // Assert
        const res = result.body;
        expect(res.error).toEqual('Not Found');
      });
    });
  });

  //Closing app after all tests => not hanging.
  afterAll(() => {
    app.close();
  });
});
