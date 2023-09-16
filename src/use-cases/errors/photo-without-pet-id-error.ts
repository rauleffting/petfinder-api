export class PhotoWithoutPetIdError extends Error {
  constructor() {
    super('Photo not linked to a pet.')
  }
}
