export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists.')
  }
}
