export interface IUser {
  _id: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface IUserContextData {
  user: IUser
  login: (user: IUser) => void
  logout: () => void
}
