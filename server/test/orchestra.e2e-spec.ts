import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestModule } from '../src/test.module';
import { OrchestraDto } from '../src/orchestra/orchestra.dto';
import { OrchestraService } from '../src/orchestra/orchestra.service';

describe('Orchestra Controller (e2e)', () => {
  let app: INestApplication;
  let orchestraService: OrchestraService;

  beforeEach(async () => {
    await orchestraService.deleteMany({}); // delete all orchestra.
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    orchestraService = moduleFixture.get(OrchestraService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Post orchesta Controller', () => {
    it('should create new valid orchestra', async () => {
      // Arrange
      const orchestra = new OrchestraDto(
        'Roskilde Ensemble',
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
        .send(orchestra);
      console.log(result);
      // .expect(201);

      // Assert
      const res = result.body;
      expect(res._id).toBeDefined();
      expect(res.__v).toEqual(0);
    });

    it('should return error when invalid data is passed on create', async () => {
      // Arrange
      const orchestra = new OrchestraDto(
        'Roskilde Ensemble',
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
        .expect(400);

      // Assert
      const res = result.body;
      expect(res.message[0]).toEqual('email must be an email');
    });

    it('should find and return user by email and password', async () => {
      // Arrange
      const orchestraToBeCreated = new OrchestraDto(
        'Roskilde Ensemble',
        'creator_id',
        'description',
        'www.google.com',
        '3050',
        'London',
        '10 - 24',
        'once a week',
        [],
      );
      await orchestraService.createNewOrchestra(orchestraToBeCreated);

      // Act
      const result = await request(app.getHttpServer())
        .post('/orchestra')
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

    // it('should return error when email could not be found', async () => {
    //   // Arrange
    //   const userToBeCreated = new UserDto(
    //     'Line',
    //     'Jensen',
    //     'hello123',
    //     'line@jensen.com',
    //   );
    //   await userService.createUser(userToBeCreated);

    //   // Act
    //   const result = await request(app.getHttpServer())
    //     .post('/user/signin')
    //     .send({ email: 'line@stevenson.com', password: 'hello123' })
    //     .expect(200);

    //   //Assert (expect)
    //   const res = result.body;
    //   expect(res).toStrictEqual({});
    // });
  });

  //Closing app after all tests => not hanging.
  afterAll(() => {
    app.close();
  });
});
