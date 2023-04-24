// all errors that inherit from this type are sent back to the client.
class ClientError extends Error {
  isClient = true;
}

export default ClientError;
