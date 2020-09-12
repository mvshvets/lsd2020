import { Store } from 'rc-field-form/lib/interface'

export interface UserContextProps {
    userData: Store | null
    setUserData: (userData: Store | null) => void
}
