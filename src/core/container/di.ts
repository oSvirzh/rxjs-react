import 'reflect-metadata';
import { container } from 'tsyringe';
import { IApiService } from '@/core/services/api/api.model';
import { ApiServiceMock } from '@/core/services/api/api.service.mock';
import { ApiServiceToken } from '@/core/services/api/api.token';

container.register<IApiService>(ApiServiceToken, ApiServiceMock);

export { container };
