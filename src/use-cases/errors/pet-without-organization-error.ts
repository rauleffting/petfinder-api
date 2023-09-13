export class PetWithoutOrganizationError extends Error {
  constructor() {
    super('Pet not linked to an organization.')
  }
}
