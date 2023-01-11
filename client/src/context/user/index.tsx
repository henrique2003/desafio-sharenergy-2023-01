import { createContext, useState } from 'react'

import { IUser, IUserContextData } from './types'

export const UserContext = createContext({} as IUserContextData);

export const UserProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>({
    _id: '',
    username: '',
    createdAt: '',
    updatedAt: ''
  })

  function login(user: IUser): void {
    setUser(user);
  }

  function logout(): void {
    setUser({
      _id: '',
      username: '',
      createdAt: '',
      updatedAt: ''
    })
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
