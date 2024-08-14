export enum Admin {
  SYSTEM_ADMIN,
  ORGANIZATION_ADMIN,
  CLIENT_ADMIN,
  ORGANIZATION_USER,
  CLIENT_USER
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  picture: string | null;

  role: Admin;
}

export interface Client {
  id: string;
  acronym: string;
  name: string;

  organization: Organization;

  managers: User[];
  users: User[];
}

export interface Organization {
  id: string;
  acronym: string;
  name: string;

  clients: Client[];

  managers: User[];
  users: User[];
}

export interface Team {
  id: string; // primary column
  organization: string;
  name: string;
  users: User[];
}

export interface Demand {
  id: string;
  client: string;
  clientUser: string; // User[]
  organizationUser: string; // User[]
  status: string;
  priority: string; // Priority
  severity: string;
  deadlineDate: string;
  topic: string; // Topic
  nature: string; // Nature
  title: string;
  description: string;
  observations?: string; // HTML type <></>
  historic?: Historic[]; // melhorar
  complement?: Complement[]; // melhorar
  files?: AttachedFiles[];
  bonds?: Demand[]; // melhorar -> vinculo com outros chamados
}

export interface Historic {
  id: string;
  date: Date;
  statusFrom?: string; // Status
  statusTo?: string; // Status
  newComplement?: boolean;
  user: string; // User -> Criar o organizationRole dentro dele -> Que será uma tabela extra
}

export interface Complement {
  id: string;
  date: Date;
  reply?: Complement;
  description: string; // HTML
  show: 'CLIENT' | 'ORGANIZATION' | 'ALL';
}

export interface AttachedFiles {
  id: string;
  date: Date;
  user: string; // User
  name: string;
  show: 'CLIENT' | 'ORGANIZATION' | 'ALL';
  url: string;
}
