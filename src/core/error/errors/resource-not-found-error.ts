import { UseCaseError } from '../use-case-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(item?: string) {
    super(item ? `${item} not found` : 'Resource not found');
  }
}
