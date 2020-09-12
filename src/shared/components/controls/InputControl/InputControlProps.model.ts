import { InputNumberProps } from 'antd/lib/input-number'
import { InputProps, PasswordProps } from 'antd/lib/input'

export interface InputControlProps extends InputProps {}

export interface InputPasswordControlProps extends PasswordProps {}

export interface InputNumberControlProps extends InputNumberProps {
    fullWidth?: boolean
}
