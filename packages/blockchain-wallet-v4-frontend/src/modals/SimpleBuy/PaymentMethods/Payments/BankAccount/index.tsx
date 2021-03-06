import {
  Content,
  DisplayContainer,
  DisplayIcon,
  DisplayTitle
} from 'components/SimpleBuy'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'blockchain-info-components'
import { SBPaymentMethodType } from 'core/types'
import { Title } from 'components/Flyout'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const DisplayTitleBank = styled(DisplayTitle)`
  margin-bottom: 2px;
`
const DisplayIconBank = styled(DisplayIcon)`
  min-height: 75px;
`

type Props = {
  icon: ReactElement
  onClick: (string) => void
  text: string
  value: SBPaymentMethodType
}

const BankAccount: React.FC<Props> = ({ value, onClick, icon, text }) => (
  <DisplayContainer
    data-e2e={`sb${value.type.toLowerCase()}BankAccount`}
    role='button'
    onClick={onClick}
  >
    <DisplayIconBank>{icon}</DisplayIconBank>
    <Content>
      <DisplayTitleBank>{text}</DisplayTitleBank>
      <Title>
        <FormattedMessage
          id='modals.simplebuy.depositcash_description'
          defaultMessage='Send funds directly from your bank to your Blockchain.com Wallet. Once we receive the manual transfer, use that cash to buy crypto.'
        />
      </Title>
    </Content>
    <Icon name='chevron-right' size='24px' color='grey400' />
  </DisplayContainer>
)

export default BankAccount
