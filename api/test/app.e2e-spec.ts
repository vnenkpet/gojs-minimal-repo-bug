import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  IProject,
  UserRole,
} from 'src/model/project/interfaces/project.interface';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const testProjectBaseData = {
    id: 'testProjectId',
    name: 'Test Project',
    isPublic: true,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /', async () => {
    const res = await request(app.getHttpServer()).get('/');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      release: expect.anything(),
      graphqlApi: expect.anything(),
      restApi: expect.anything(),
    });
  });

  it('GET /:dsn/identity', async () => {
    const expectedResponse: Omit<IProject, 'dsn' | 'createdAt'> = {
      ...testProjectBaseData,
      edges: [],
      nodes: [],
      users: [{ id: '346', role: UserRole.owner }],
    };

    const res = await request(app.getHttpServer()).get(
      '/testProjectDsn/identity',
    );

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(expectedResponse);
  });

  it('POST /:dsn/capture/service-a/service-b', async () => {
    const res = await request(app.getHttpServer()).post(
      '/testProjectDsn/capture/service-a/service-b',
    );

    expect(res.status).toBe(204);
  });

  it('GET /:dsn/identity', async () => {
    const expectedResponse: Omit<IProject, 'dsn' | 'createdAt'> = {
      ...testProjectBaseData,
      edges: [
        {
          id: expect.anything(),
          sourceNodeId: 'service-a',
          targetNodeId: 'service-b',
        },
      ],
      nodes: [{ uniqueName: 'service-a' }, { uniqueName: 'service-b' }],
      users: [{ id: '346', role: UserRole.owner }],
    };

    const res = await request(app.getHttpServer()).get(
      '/testProjectDsn/identity',
    );

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(expectedResponse);
  });

  it('POST /:dsn/capture/service-a/service-b (repeat)', async () => {
    const res = await request(app.getHttpServer()).post(
      '/testProjectDsn/capture/service-a/service-b',
    );

    expect(res.status).toBe(204);
  });

  it('GET /:dsn/identity', async () => {
    const expectedResponse: Omit<IProject, 'dsn' | 'createdAt'> = {
      ...testProjectBaseData,
      edges: [
        {
          id: expect.anything(),
          sourceNodeId: 'service-a',
          targetNodeId: 'service-b',
        },
      ],
      nodes: [{ uniqueName: 'service-a' }, { uniqueName: 'service-b' }],
      users: [{ id: '346', role: UserRole.owner }],
    };

    const res = await request(app.getHttpServer()).get(
      '/testProjectDsn/identity',
    );

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(expectedResponse);
  });

  it('POST /:dsn/capture/service-a/service-c)', async () => {
    const res = await request(app.getHttpServer()).post(
      '/testProjectDsn/capture/service-a/service-c',
    );

    expect(res.status).toBe(204);
  });

  it('GET /:dsn/identity', async () => {
    const expectedResponse: Omit<IProject, 'dsn' | 'createdAt'> = {
      ...testProjectBaseData,
      edges: [
        {
          id: expect.anything(),
          sourceNodeId: 'service-a',
          targetNodeId: 'service-b',
        },
        {
          id: expect.anything(),
          sourceNodeId: 'service-a',
          targetNodeId: 'service-c',
        },
      ],
      nodes: [
        { uniqueName: 'service-a' },
        { uniqueName: 'service-b' },
        { uniqueName: 'service-c' },
      ],
      users: [{ id: '346', role: UserRole.owner }],
    };

    const res = await request(app.getHttpServer()).get(
      '/testProjectDsn/identity',
    );

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(expectedResponse);
  });
});
