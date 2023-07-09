export interface ISecretCreation {
  uri: string;
  createdAt: string;
  expiresAt: string;
  viewsAllowed: number;
  viewsLeft: number;
  salt: string;
  passphrase: string;
  iv: Buffer;
  secret: string;
  id: number;
}
