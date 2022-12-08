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
        []
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/orchestra')
        .send(orchestra)
        .expect(401);
      // Assert
      const res = result.body;
      console.log(res);
      expect(res._id).toBeDefined();
      expect(res.__v).toEqual(0);
    });

    it('should return error when invalid data is passed on create', async () => {
      // Arrange
      const orchestra = new OrchestraDto(
        '1542',
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
      expect(res.message[0]).toEqual('title can not be empty');
    });

    it('should find and return orchestra by creator_id and title', async () => {
      // Arrange
      const orchestraToBeCreated = new OrchestraDto(
        'London Ensemble',
        'creator_id',
        'description',
        'www.google.com',
        '3050',
        'London',
        '10-20',
        'once a week',
        [],
      );
      await orchestraService.createNewOrchestra(orchestraToBeCreated);

      // Act
      const result = await request(app.getHttpServer())
        .post('/orchestra')
        .send({ title: 'London Ensemble', creator_id: 'creator_id' })
        .expect(401);

      //Assert (expect)
      const res = result.body;
      console.log(res);
      expect.objectContaining({
        title: 'London Ensemble',
        creator_id: 'creator_id',
        description: 'description',
        website: 'www.google.com',
        zipcode: '3050',
        city: 'London',
        musicians_amount: '10-20',
        practice_frequency: 'once a week',
        genres: [],

      });
    });

  });

  describe('Delete Orchestra Controller', () => {
    it('should delete orchestra by id', async () => {
      // Arrange
      const orchestraQuery = new OrchestraDto(
        'London Ensemble',
        'creator_id',
        'description',
        'www.google.com',
        '3050',
        'London',
        '10-20',
        'once a week',
        [],
      );
      const orchestra = await orchestraService.createNewOrchestra(orchestraQuery);
      console.log(orchestraQuery);

      // Act
      const result = await request(app.getHttpServer())
        .delete(`/orchestra/${orchestra._id}`)
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
        .delete(`/orchestra/${id}`)
        .expect(404);

      // Assert
      const res = result.body;
      expect(res.error).toEqual('Not Found');
    });
  });


  describe('Put Orchestra Controller', () => {
    it('should update orchestra with given id and orchestra dto', async () => {
      // Arrange
      const orchestraQuery = new OrchestraDto(
        'London Ensemble',
        'creator_id',
        'description',
        'www.google.com',
        '3050',
        'London',
        '10-20',
        'once a week',
        [],
      );
      const orchestra = await orchestraService.createNewOrchestra(orchestraQuery);
      console.log(orchestra);

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

      // Act
      const result = await request(app.getHttpServer())
        .put(`/orchestra/${updatedOrchestra.creator_id}`)
        .send(updatedOrchestra)
        .expect(200);

      // Assert
      const res = result.body;
      expect(res.acknowledged).toEqual(true);
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

  //Closing app after all tests => not hanging.
  afterAll(() => {
    app.close();
  });
});
