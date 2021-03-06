import {
  convertBaseToStandard,
  convertStandardToBase
} from 'data/components/exchange/services'
import { CRYPTO_DECIMALS } from 'services/ValidationHelper'
import { Exchange } from 'blockchain-wallet-v4/src'
import { PaymentValue, RateType, SwapUserLimitsType } from 'core/types'
import BigNumber from 'bignumber.js'

import { Props } from '.'
import { SwapAccountType, SwapAmountFormValues } from 'data/types'

export const getMaxMin = (
  minOrMax: 'min' | 'max',
  limits: SwapUserLimitsType,
  rate: RateType,
  payment: undefined | PaymentValue,
  BASE: SwapAccountType
) => {
  switch (minOrMax) {
    case 'max':
      const fiatMax = new BigNumber(
        convertBaseToStandard('FIAT', limits.maxPossibleOrder)
      )
      const cryptoMax = new BigNumber(
        convertStandardToBase(BASE.coin, fiatMax.dividedBy(rate.last))
      )
      const userMax = payment ? payment.effectiveBalance : BASE.balance
      return convertBaseToStandard(
        BASE.coin,
        Math.min(userMax, cryptoMax.toNumber())
      )
    case 'min':
      const fiatMin = convertBaseToStandard('FIAT', limits.minOrder)
      return new BigNumber(fiatMin)
        .dividedBy(rate.last)
        .toPrecision(CRYPTO_DECIMALS)
  }
}

export const maximumAmount = (
  value: string,
  allValues: SwapAmountFormValues,
  restProps: Props
) => {
  if (!value) return true
  if (!allValues) return

  const { fix, limits, rates, payment, walletCurrency } = restProps

  const cryptoMax = Number(
    getMaxMin('max', limits, rates[walletCurrency], payment, restProps.BASE)
  )
  const fiatMax = Exchange.convertCoinToFiat(
    cryptoMax,
    restProps.BASE.coin,
    walletCurrency,
    rates
  )

  return Number(value) > (fix === 'CRYPTO' ? cryptoMax : fiatMax)
    ? 'ABOVE_MAX'
    : false
}

export const minimumAmount = (
  value: string,
  allValues: SwapAmountFormValues,
  restProps: Props
) => {
  if (!value) return true
  if (!allValues) return

  const { fix, limits, rates, payment, walletCurrency } = restProps

  const cryptoMin = Number(
    getMaxMin('min', limits, rates[walletCurrency], payment, restProps.BASE)
  )
  const fiatMin = Exchange.convertCoinToFiat(
    cryptoMin,
    restProps.BASE.coin,
    walletCurrency,
    rates
  )

  return Number(value) < (fix === 'CRYPTO' ? cryptoMin : fiatMin)
    ? 'BELOW_MIN'
    : false
}

export const maximumAmountSilver = (
  restProps: Props,
  amtError: string | boolean
) => {
  const { limits, userData } = restProps
  if (userData.tiers.current === 2) return
  if (
    userData.tiers.current === 1 &&
    amtError === 'ABOVE_MAX' &&
    limits.maxPossibleOrder < limits.maxOrder
  )
    return true
}
