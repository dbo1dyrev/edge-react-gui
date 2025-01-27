// @flow

import * as React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import s from '../../locales/strings'
import type { RootState } from '../../reducers/RootReducer'
import { type Theme, type ThemeProps, cacheStyles, withTheme } from '../services/ThemeContext.js'
import { EdgeText } from './EdgeText'

export type Props = {
  message: string
}

export class CryptoExchangeMessageBoxComponent extends React.PureComponent<Props & ThemeProps> {
  render() {
    if (!this.props.message) return null
    const styles = getStyles(this.props.theme)

    return (
      <View style={styles.container}>
        <EdgeText style={styles.text}>{this.props.message}</EdgeText>
      </View>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.rem(1)
  },
  text: {
    color: theme.dangerText,
    fontSize: theme.rem(0.75)
  }
}))

const mapStateToProps = (state: RootState): Props => {
  const insufficient = state.cryptoExchange.insufficientError
  const genericError = state.cryptoExchange.genericShapeShiftError

  let message = ''

  if (genericError) {
    message = genericError
  } else if (insufficient) {
    message = s.strings.fragment_insufficient_funds
  }

  return {
    message
  }
}

export const CryptoExchangeMessageBox = connect(mapStateToProps, null)(withTheme(CryptoExchangeMessageBoxComponent))
