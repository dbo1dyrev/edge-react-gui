// @flow

import type { EdgeCurrencyConfig, EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { FlatList, View } from 'react-native'
import { type AirshipBridge } from 'react-native-airship'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { Fontello } from '../../../assets/vector'
import { type Theme, type ThemeProps, cacheStyles, withTheme } from '../../../components/services/ThemeContext'
import { EdgeText } from '../../../components/themed/EdgeText'
import { EdgeTextFieldOutlined } from '../../../components/themed/EdgeTextField'
import { ModalCloseArrow, ModalTitle } from '../../../components/themed/ModalParts.js'
import { ClickableText } from '../../../components/themed/ThemedButtons'
import { ThemedModal } from '../../../components/themed/ThemedModal.js'
import * as Constants from '../../../constants/indexConstants'
import s from '../../../locales/strings.js'
import { type RootState } from '../../../types/reduxTypes'
import type { FioDomain, FlatListItem } from '../../../types/types.js'
import { getFioWallets } from '../../UI/selectors'

type Item = {
  label: string,
  value: FioDomain,
  isFree?: boolean,
  createNew?: boolean
}

type StateProps = {
  userDomains: FioDomain[],
  fioWallets: EdgeCurrencyWallet[],
  fioPlugin: EdgeCurrencyConfig | null
}

type OwnProps = {
  bridge: AirshipBridge<FioDomain | null>,
  publicDomains: FioDomain[]
}

type State = {
  input: string,
  isFocused: boolean,
  domains: Item[],
  prevDomainsJson: string
}

type Props = OwnProps & ThemeProps & StateProps

const newDomainItem = {
  createNew: true,
  value: { ...Constants.FIO_DOMAIN_DEFAULT, name: s.strings.fio_address_list_register_domain },
  label: s.strings.fio_address_list_register_domain
}

class DomainListModalComponent extends React.Component<Props, State> {
  textInput = React.createRef()
  constructor(props: Props) {
    super(props)
    this.state = {
      input: '',
      domains: [],
      prevDomainsJson: '',
      isFocused: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { publicDomains, userDomains } = props

    const prevDomainsJson = JSON.stringify([...publicDomains, ...userDomains])
    if (prevDomainsJson === state.prevDomainsJson) {
      return null
    }

    const domains = publicDomains.map((pubDomain: FioDomain) => ({
      value: pubDomain,
      label: `${Constants.FIO_ADDRESS_DELIMITER}${pubDomain.name}`
    }))
    const userDomainsConverted = []
    for (const fioDomain of userDomains) {
      userDomainsConverted.push({ value: fioDomain, label: `${Constants.FIO_ADDRESS_DELIMITER}${fioDomain.name}` })
    }
    userDomainsConverted.sort((userDomainA: Item, userDomainB: Item) => (userDomainA.value.name < userDomainB.value.name ? -1 : 1))

    return { domains: [...domains, ...userDomainsConverted], prevDomainsJson }
  }

  componentDidMount() {
    if (this.textInput.current) {
      this.textInput.current.focus()
    }
  }

  clearText = () => {
    this.setState({ input: '' })
    if (this.textInput.current) {
      this.textInput.current.blur()
    }
  }

  fieldOnFocus = () => {
    this.setState({ isFocused: true })
  }

  fieldOnBlur = () => {
    this.setState({ isFocused: false })
  }

  getItems = () => {
    const { domains, input } = this.state

    if (input === '') {
      return [...domains, newDomainItem]
    }

    // Search Input Filter
    const inputLowerCase = input.toLowerCase()
    const filteredRecords = []
    for (const item of domains) {
      const { label, value } = item

      if (value) {
        const labelString = label.toLowerCase()
        if (labelString.includes(inputLowerCase)) {
          filteredRecords.push(item)
        }
      }
    }
    return filteredRecords
  }

  selectCustom = () => {
    const { input } = this.state
    const fioDomain = { ...Constants.FIO_DOMAIN_DEFAULT, name: input }

    this.props.bridge.resolve(fioDomain)
  }

  registerNewDomain = () => {
    this.props.bridge.resolve(null)
    Actions[Constants.FIO_DOMAIN_REGISTER]()
  }

  selectItem = (value: any) => this.props.bridge.resolve(value)
  renderItem = ({ item }: FlatListItem<Item>) => {
    const { theme } = this.props
    const { value, label, createNew } = item
    const styles = getStyles(theme)
    if (createNew) {
      return (
        <ClickableText onPress={this.registerNewDomain} paddingRem={0}>
          <View style={[styles.rowContainerTop, styles.registerDomainRow]}>
            <Fontello name="register-custom-fio" style={styles.domainRegisterIcon} color={theme.iconTappable} size={theme.rem(1)} />
            <EdgeText style={styles.domainRegisterText}>{s.strings.fio_address_list_domain_register}</EdgeText>
          </View>
        </ClickableText>
      )
    }
    if (value) {
      return (
        <ClickableText onPress={() => this.selectItem(value)} paddingRem={0}>
          <View style={styles.rowContainerTop}>
            <EdgeText style={styles.domainListRowName}>{label}</EdgeText>
            <EdgeText style={styles.domainListRowFree}>{value.isFree ? s.strings.fio_domain_free : ''}</EdgeText>
          </View>
        </ClickableText>
      )
    }
    return null
  }

  keyExtractor = (item: Item, index: number) => index.toString()
  onSearchFilterChange = (input: string) => this.setState({ input })
  render() {
    const { bridge, theme } = this.props
    const { input, isFocused } = this.state
    const items = this.getItems()
    return (
      <ThemedModal bridge={bridge} onCancel={() => bridge.resolve(null)} paddingRem={[1, 0]}>
        <ModalTitle center paddingRem={[0, 3, 1]}>
          {s.strings.fio_address_choose_domain_label}
        </ModalTitle>
        <View style={{ marginHorizontal: theme.rem(0.75) }}>
          <EdgeTextFieldOutlined
            autoFocus
            autoCorrect={false}
            returnKeyType="search"
            keyboardType="default"
            autoCapitalize="none"
            label={s.strings.fio_domain_label}
            onChangeText={this.onSearchFilterChange}
            onSubmitEditing={this.selectCustom}
            onFocus={this.fieldOnFocus}
            onBlur={this.fieldOnBlur}
            value={input}
            onClear={this.clearText}
            isClearable={isFocused}
            marginRem={[0, 1]}
            ref={this.textInput}
            blurOnSubmit
          />
        </View>
        <FlatList data={items} initialNumToRender={24} keyboardShouldPersistTaps="handled" keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
        <ModalCloseArrow onPress={() => bridge.resolve(null)} />
      </ThemedModal>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  rowContainerTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.rem(1)
  },
  domainListRowName: {
    flex: 1,
    fontSize: theme.rem(1),
    color: theme.primaryText
  },
  domainListRowFree: {
    flex: 1,
    fontSize: theme.rem(0.75),
    textTransform: 'uppercase',
    color: theme.negativeText,
    textAlign: 'right'
  },
  registerDomainRow: {
    paddingLeft: 0,
    marginLeft: theme.rem(1),
    marginTop: theme.rem(0.25),
    paddingTop: theme.rem(1.25),
    borderTopWidth: theme.rem(0.05),
    borderTopColor: theme.lineDivider
  },
  domainRegisterText: {
    marginLeft: theme.rem(0.5),
    color: theme.textLink
  },
  domainRegisterIcon: {
    marginTop: theme.rem(0.25)
  }
}))

export const DomainListModal = connect((state: RootState): StateProps => {
  const { account } = state.core
  const fioWallets: EdgeCurrencyWallet[] = getFioWallets(state)
  const fioPlugin = account.currencyConfig ? account.currencyConfig[Constants.CURRENCY_PLUGIN_NAMES.FIO] : null
  return {
    userDomains: state.ui.scenes.fioAddress.fioDomains,
    fioWallets,
    fioPlugin
  }
})(withTheme(DomainListModalComponent))
