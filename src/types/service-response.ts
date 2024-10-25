import { ServiceError } from '@/errors/service-error';

export type ServiceResponse<T> = Promise<[T | null, ServiceError | null]>;