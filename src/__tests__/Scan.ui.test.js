// @flow
/* globals jest describe it expect */

import * as React from 'react'
import RNPermissions from 'react-native-permissions'
import ShallowRenderer from 'react-test-renderer/shallow'

import { Scan } from '../components/scenes/ScanScene.js'
jest.useFakeTimers()
describe('Scan component', () => {
  it('should render with BLOCKED props', () => {
    const renderer = new ShallowRenderer()
    const props = {
      cameraPermission: RNPermissions.BLOCKED,
      torchEnabled: false,
      scanEnabled: false,
      showToWalletModal: false,
      currentWalletId: '',
      currentCurrencyCode: '',
      walletId: '',
      currencyCode: '',
      wallets: {},
      qrCodeScanned: jest.fn(),
      parseScannedUri: jest.fn(),
      toggleEnableTorch: jest.fn(),
      toggleScanToWalletListModal: jest.fn(),
      onSelectWallet: jest.fn(),
      selectFromWalletForExchange: jest.fn()
    }
    const actual = renderer.render(<Scan {...props} />)

    expect(actual).toMatchSnapshot()
  })

  it('should render with GRANTED props', () => {
    const renderer = new ShallowRenderer()
    const props = {
      cameraPermission: RNPermissions.GRANTED,
      torchEnabled: false,
      scanEnabled: false,
      showToWalletModal: false,
      currentWalletId: '',
      currentCurrencyCode: '',
      walletId: '',
      currencyCode: '',
      wallets: {},
      qrCodeScanned: jest.fn(),
      parseScannedUri: jest.fn(),
      toggleEnableTorch: jest.fn(),
      toggleScanToWalletListModal: jest.fn(),
      onSelectWallet: jest.fn(),
      selectFromWalletForExchange: jest.fn()
    }
    const actual = renderer.render(<Scan {...props} />)

    expect(actual).toMatchSnapshot()
  })
})
