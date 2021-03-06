import { Form } from 'redux-form'
import { Text } from 'blockchain-info-components'
import styled, { DefaultTheme } from 'styled-components'

export const Border = styled.div`
  border-top: 1px solid ${props => props.theme.grey000};
`

export const TopText = styled(Text)<{
  marginBottom?: boolean
  spaceBetween: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.spaceBetween ? 'space-between' : 'initial'};
  margin-bottom: ${props => (props.marginBottom ? '16px' : '0px')};
`
export const StyledForm = styled(Form)<{ marginTop?: boolean }>`
  margin-top: ${props => (props.marginTop ? '36px' : '0px')};
`
export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: ${props => `1px solid ${props.theme.grey000}`};
  padding: 16px 40px;
  cursor: pointer;
`
export const OptionTitle = styled(Text)`
  color: ${props => props.theme.grey900};
  margin-top: 4px;
  font-weight: 600;
`
export const OptionValue = styled(Text)<{ color?: keyof DefaultTheme }>`
  color: ${props => props.color || props.theme.grey600};
  margin-top: 4px;
  font-weight: 600;
  font-size: 14px;
`
export const BalanceRow = styled.div`
  display: flex;
  align-items: center;
`
export const IconBackground = styled.div<{ position?: string; size: string }>`
  position: ${props => props.position};
  left: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
  z-index: 100;
  background: ${props => props.theme.blue000};
`

export const TrendingIconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 24px;
`

export const FlexStartRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const CircleBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: white;
  border: 1px solid ${props => props.theme.grey300};
  border-radius: 24px;
  margin-left: 24px;
`

export const CircleSelected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.grey300};
  border-radius: 20px;
`
