// @flow
import isoFiatDenominations from './IsoFiatDenominations.js'

export const getSettings = (state: any) => {
  const settings = state.ui.settings
  return settings
}

export const getLoginStatus = (state: any) => {
  const settings = getSettings(state)
  const loginStatus = settings.loginStatus
  return loginStatus
}

export const getExchangeTimer = (state: any) => {
  const settings = getSettings(state)
  const exchangeTimer = settings.exchangeTimer
  return exchangeTimer
}

export const getDenominationIndex = (state: any, currencyCode: string) => {
  const settings = getSettings(state)
  const currencySettings = settings[currencyCode]
  let denominationIndex:string
  if (currencySettings) {
    denominationIndex = currencySettings.denomination
  }
  console.log('in getDenominationIndex, settings is: ', settings, ' , currencySettings is: ', currencySettings, ' , currencyCode is: ', currencyCode, ' , denominationIndex is: ', denominationIndex)
  return denominationIndex
}

export const getCurrencySettings = (state: any, currencyCode: string) => {
  const settings = getSettings(state)
  const currencySettings = settings[currencyCode] || isoFiatDenominations[currencyCode]
  return currencySettings
}

export const getDenominations = (state: any, currencyCode: string) => {
  const currencySettings = getCurrencySettings(state, currencyCode)
  const denominations = currencySettings.denominations
  return denominations
}

export const getDisplayDenominationKey = (state: any, currencyCode: string) => {
  console.log('in getDisplayDenominationKey, state is: ', state, ' , and currencyCode is: ', currencyCode)
  const settings = getSettings(state)
  const currencySettings = settings[currencyCode]
  const selectedDenominationKey = currencySettings.denomination
  return selectedDenominationKey
}

export const getDisplayDenomination = (state: any, currencyCode: string) => {
  const selectedDenominationKey = getDisplayDenominationKey(state, currencyCode)
  const denominations = getDenominations(state, currencyCode)
  const selectedDenomination = denominations.find(denomination => {
    return denomination.multiplier === selectedDenominationKey
  })
  return selectedDenomination
}

export const getExchangeDenomination = (state: any, currencyCode: string) => {
  const denominations = getDenominations(state, currencyCode)
  const exchangeDenomination = denominations.find(denomination => {
    return denomination.name === currencyCode
  })
  return exchangeDenomination
}

export const getPlugins = (state: any) => {
  const settings = getSettings(state)
  const plugins = settings.plugins
  return plugins
}

export const getPlugin = (state: any, type: string) => {
  const plugins = getPlugins(state)
  const plugin = plugins[type]
  return plugin
}

export const getBitcoinPlugin = (state: any) => {
  const bitcoinPlugin = getPlugin(state, 'bitcoin')
  return bitcoinPlugin
}

export const getEthereumPlugin = (state: any) => {
  const ethereumPlugin = getPlugin(state, 'ethereum')
  return ethereumPlugin
}

export const getSupportedWalletTypes = (state: any) => {
  const plugins = getPlugins(state).arrayPlugins
  const supportedWalletTypes = plugins.reduce((walletTypes, plugin) => ({
    ...walletTypes,
    [plugin.currencyInfo.currencyName]: plugin.currencyInfo.walletTypes[0]
  }), {})
  return supportedWalletTypes
}
