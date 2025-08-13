export interface IRoom {
  id: string;
  name: string;
  visitors: number;
}

export interface IVisitor {
  name: string;
  room: string;
  email?: string;
  cpf?: string;
  birth?: string
  input?: string;
  output?: string;
}