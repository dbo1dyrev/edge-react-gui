// @flow

import { type EdgeAccount } from 'edge-core-js/types'
import * as React from 'react'
import { Image, Platform, ScrollView, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { exchangeTimerExpired, shiftCryptoCurrency } from '../../actions/CryptoExchangeActions'
import { swapPluginLogos } from '../../assets/images/exchange'
import s from '../../locales/strings.js'
import { Slider } from '../../modules/UI/components/Slider/Slider'
import type { RootState } from '../../reducers/RootReducer'
import type { Dispatch } from '../../types/reduxTypes'
import { type GuiSwapInfo } from '../../types/types.js'
import { logEvent } from '../../util/tracking.js'
import { CircleTimer } from '../common/CircleTimer'
import { SceneWrapper } from '../common/SceneWrapper.js'
import { ButtonsModal } from '../modals/ButtonsModal'
import { swapVerifyTerms } from '../modals/SwapVerifyTermsModal.js'
import { Airship, showError } from '../services/AirshipInstance'
import { type Theme, type ThemeProps, cacheStyles, withTheme } from '../services/ThemeContext.js'
import { Card } from '../themed/Card'
import { EdgeText } from '../themed/EdgeText'
import { ExchangeQuote } from '../themed/ExchangeQuoteComponent.js'
import { LineTextDivider } from '../themed/LineTextDivider'
import { ClickableText } from '../themed/ThemedButtons'

export type OwnProps = {
  swapInfo: GuiSwapInfo
}
export type StateProps = {
  account: EdgeAccount,
  fromCurrencyIcon: string,
  fromDenomination: string,
  fromWalletCurrencyName: string,
  pending: boolean,
  toCurrencyIcon: string,
  toDenomination: string,
  toWalletCurrencyName: string
}
export type DispatchProps = {
  shift(swapInfo: GuiSwapInfo): mixed,
  timeExpired(swapInfo: GuiSwapInfo): void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

type State = {}

export class CryptoExchangeQuoteScreenComponent extends React.Component<Props, State> {
  calledApprove: true

  componentDidMount = () => {
    const check = {
      changelly: this.checkChangellyKYC,
      changenow: this.checkChangeNowKYC,
      coinswitch: this.checkCoinswitchKYC,
      foxExchange: this.checkFoxExchangeKYC,
      switchain: this.checkSwitchainKYC
    }
    try {
      check[this.props.swapInfo.quote.pluginId]()
    } catch (e) {
      showError(e)
    }
    logEvent('SwapQuote')
  }

  componentWillUnmount() {
    const { swapInfo } = this.props
    if (!this.calledApprove) swapInfo.quote.close()
  }

  doShift = () => {
    const { shift, swapInfo } = this.props
    this.calledApprove = true
    shift(swapInfo)
  }

  renderTimer = () => {
    const { swapInfo, timeExpired } = this.props
    const { expirationDate } = swapInfo.quote

    if (!expirationDate) return null
    return <CircleTimer timeExpired={() => timeExpired(swapInfo)} expiration={expirationDate} />
  }

  async checkChangellyKYC() {
    const { account, swapInfo, timeExpired } = this.props
    const result = await swapVerifyTerms(account.swapConfig.changelly, [
      {
        text: s.strings.swap_terms_terms_link,
        uri: 'https://changelly.com/terms-of-use'
      },
      {
        text: s.strings.swap_terms_privacy_link,
        uri: 'https://changelly.com/privacy-policy'
      },
      {
        text: s.strings.swap_terms_kyc_link,
        uri: 'https://changelly.com/aml-kyc'
      }
    ])
    if (!result) timeExpired(swapInfo)
  }

  async checkSwitchainKYC() {
    const { account, swapInfo, timeExpired } = this.props
    const result = await swapVerifyTerms(account.swapConfig.switchain, [
      {
        text: s.strings.swap_terms_terms_link,
        uri: 'https://www.switchain.com/tos'
      },
      {
        text: s.strings.swap_terms_privacy_link,
        uri: 'https://www.switchain.com/policy'
      },
      {
        text: s.strings.swap_terms_kyc_link,
        uri: 'https://www.switchain.com/policy'
      }
    ])
    if (!result) timeExpired(swapInfo)
  }

  async checkChangeNowKYC() {
    const { account, swapInfo, timeExpired } = this.props
    const result = await swapVerifyTerms(account.swapConfig.changenow, [
      {
        text: s.strings.swap_terms_terms_link,
        uri: 'https://changenow.io/terms-of-use'
      },
      {
        text: s.strings.swap_terms_privacy_link,
        uri: 'https://changenow.io/privacy-policy'
      },
      {
        text: s.strings.swap_terms_kyc_link,
        uri: 'https://changenow.io/faq/kyc'
      }
    ])
    if (!result) timeExpired(swapInfo)
  }

  async checkCoinswitchKYC() {
    const { account, swapInfo, timeExpired } = this.props
    const result = await swapVerifyTerms(account.swapConfig.coinswitch, [
      {
        text: s.strings.swap_terms_terms_link,
        uri: 'https://coinswitch.co/terms'
      }
    ])
    if (!result) timeExpired(swapInfo)
  }

  async checkFoxExchangeKYC() {
    const { account, swapInfo, timeExpired } = this.props
    const result = await swapVerifyTerms(account.swapConfig.foxExchange, [
      {
        text: s.strings.swap_terms_terms_link,
        uri: 'https://fox.exchange/tos'
      }
    ])
    if (!result) timeExpired(swapInfo)
  }

  showExplanationForEstimate = () => {
    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.estimated_exchange_rate}
        message={s.strings.estimated_exchange_rate_body}
        buttons={{ ok: { label: s.strings.string_ok } }}
      />
    ))
  }

  render() {
    const {
      fromCurrencyIcon,
      fromDenomination,
      fromWalletCurrencyName,
      swapInfo,
      toCurrencyIcon,
      toDenomination,
      toWalletCurrencyName,
      pending,
      theme
    } = this.props
    const { fee, fromDisplayAmount, fromFiat, fromTotalFiat, toDisplayAmount, toFiat } = swapInfo
    const { isEstimate, pluginId } = swapInfo.quote
    const { fromWallet, toWallet } = swapInfo.request
    const styles = getStyles(theme)

    return (
      <SceneWrapper background="theme">
        <ScrollView>
          <View style={styles.topLogoRow}>
            <Image source={swapPluginLogos[pluginId]} resizeMode="contain" style={styles.logoImage} />
          </View>
          <LineTextDivider title={s.strings.fragment_send_from_label} lowerCased />
          <ExchangeQuote
            cryptoAmount={fromDisplayAmount}
            currency={fromWalletCurrencyName}
            currencyCode={fromDenomination}
            fiatCurrencyAmount={fromFiat}
            fiatCurrencyCode={fromWallet.fiatCurrencyCode.replace('iso:', '')}
            isTop
            miningFee={fee}
            total={fromTotalFiat}
            walletIcon={fromCurrencyIcon}
            walletName={fromWallet.name || ''}
          />
          <LineTextDivider title={s.strings.string_to_capitalize} lowerCased />
          <ExchangeQuote
            cryptoAmount={toDisplayAmount}
            currency={toWalletCurrencyName}
            currencyCode={toDenomination}
            fiatCurrencyAmount={toFiat}
            fiatCurrencyCode={toWallet.fiatCurrencyCode.replace('iso:', '')}
            walletIcon={toCurrencyIcon}
            walletName={toWallet.name || ''}
          />
          {isEstimate && (
            <Card warning marginRem={[1.5, 1]}>
              <ClickableText paddingRem={0} onPress={this.showExplanationForEstimate}>
                <View style={styles.estimatedContainer}>
                  <IonIcon
                    name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle-outline'}
                    color={theme.warningIcon}
                    size={theme.rem(1.25)}
                  />
                  <EdgeText style={styles.estimatedTitle}>{s.strings.estimated_quote}</EdgeText>
                </View>
                <EdgeText style={styles.estimatedText} numberOfLines={2}>
                  {s.strings.estimated_exchange_message}
                </EdgeText>
              </ClickableText>
            </Card>
          )}
          <Slider parentStyle={styles.slider} onSlidingComplete={this.doShift} disabled={pending} showSpinner={pending} />
          {this.renderTimer()}
          <View style={styles.spacer} />
        </ScrollView>
      </SceneWrapper>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  topLogoRow: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.rem(0.5),
    height: theme.rem(3.25),
    paddingBottom: theme.rem(0.25)
  },
  logoImage: {
    position: 'relative',
    maxWidth: '70%',
    resizeMode: 'contain'
  },
  estimatedContainer: {
    marginBottom: theme.rem(0.25),
    flexDirection: 'row',
    alignItems: 'center'
  },
  estimatedTitle: {
    color: theme.warningText,
    marginLeft: theme.rem(0.5),
    fontSize: theme.rem(0.75),
    fontWeight: '600'
  },
  estimatedText: {
    fontSize: theme.rem(0.75),
    color: theme.warningText
  },
  slider: {
    alignItems: 'center'
  },
  spacer: {
    height: theme.rem(8)
  }
}))

export const CryptoExchangeQuote = connect(
  (state: RootState, ownProps: OwnProps): StateProps => {
    const { request } = ownProps.swapInfo

    const { account } = state.core
    const fromWallet = state.cryptoExchange.fromWallet
    const toWallet = state.cryptoExchange.toWallet

    const toWalletCurrencyName = toWallet != null ? toWallet.currencyNames[request.toCurrencyCode] : ''
    const fromWalletCurrencyName = fromWallet != null ? fromWallet.currencyNames[request.fromCurrencyCode] : ''

    return {
      account,
      fromCurrencyIcon: state.cryptoExchange.fromCurrencyIcon || '',
      fromDenomination: state.cryptoExchange.fromWalletPrimaryInfo.displayDenomination.name,
      fromWalletCurrencyName,
      pending: state.cryptoExchange.shiftPendingTransaction,
      toCurrencyIcon: state.cryptoExchange.toCurrencyIcon || '',
      toDenomination: state.cryptoExchange.toWalletPrimaryInfo.displayDenomination.name,
      toWalletCurrencyName
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    shift(swapInfo: GuiSwapInfo) {
      dispatch(shiftCryptoCurrency(swapInfo))
    },
    timeExpired(swapInfo: GuiSwapInfo) {
      dispatch(exchangeTimerExpired(swapInfo))
    }
  })
)(withTheme(CryptoExchangeQuoteScreenComponent))
