// @flow

import { type BuySellFilter } from '../../types/types.js'

export const buyPluginFilter: BuySellFilter = {
  simplex: {
    countryCodes: {
      AF: true,
      AL: true,
      DZ: true,
      AS: true,
      AD: true,
      AO: true,
      AI: true,
      AQ: true,
      AG: true,
      AR: true,
      AM: true,
      AW: true,
      AU: true,
      AT: true,
      AZ: true,
      BH: true,
      BD: true,
      BB: true,
      BY: true,
      BE: true,
      BZ: true,
      BJ: true,
      BM: true,
      BT: true,
      BO: true,
      BQ: true,
      BA: true,
      BV: true,
      BR: true,
      IO: true,
      BN: true,
      BG: true,
      BF: true,
      BI: true,
      CM: true,
      CA: true,
      CV: true,
      KY: true,
      CF: true,
      TD: true,
      CL: true,
      CN: true,
      CX: true,
      CC: true,
      CO: true,
      KM: true,
      CG: true,
      CD: true,
      CK: true,
      CR: true,
      HR: true,
      CU: true,
      CW: true,
      CY: true,
      CZ: true,
      CI: true,
      DK: true,
      DJ: true,
      DM: true,
      DO: true,
      EC: true,
      EG: true,
      SV: true,
      GQ: true,
      ER: true,
      EE: true,
      FK: true,
      FO: true,
      FJ: true,
      FI: true,
      FR: true,
      GF: true,
      PF: true,
      TF: true,
      GA: true,
      GM: true,
      GE: true,
      DE: true,
      GI: true,
      GR: true,
      GL: true,
      GD: true,
      GP: true,
      GU: true,
      GT: true,
      GG: true,
      GN: true,
      GW: true,
      GY: true,
      HT: true,
      HM: true,
      VA: true,
      HN: true,
      HK: true,
      HU: true,
      IS: true,
      IN: true,
      ID: true,
      IQ: true,
      IE: true,
      IM: true,
      IL: true,
      IT: true,
      JM: true,
      JP: true,
      JE: true,
      JO: true,
      KZ: true,
      KE: true,
      KI: true,
      KR: true,
      KW: true,
      KG: true,
      LA: true,
      LV: true,
      LB: true,
      LS: true,
      LR: true,
      LY: true,
      LI: true,
      LT: true,
      LU: true,
      MO: true,
      MK: true,
      MG: true,
      MW: true,
      MY: true,
      MV: true,
      ML: true,
      MT: true,
      MH: true,
      MQ: true,
      MR: true,
      MU: true,
      YT: true,
      MX: true,
      FM: true,
      MD: true,
      MC: true,
      MN: true,
      ME: true,
      MS: true,
      MA: true,
      MZ: true,
      MM: true,
      NA: true,
      NR: true,
      NP: true,
      NL: true,
      NC: true,
      NZ: true,
      NI: true,
      NE: true,
      NG: true,
      NU: true,
      NF: true,
      MP: true,
      NO: true,
      OM: true,
      PW: true,
      PS: true,
      PG: true,
      PY: true,
      PE: true,
      PH: true,
      PN: true,
      PL: true,
      PT: true,
      PR: true,
      QA: true,
      RO: true,
      RU: true,
      RW: true,
      RE: true,
      BL: true,
      SH: true,
      KN: true,
      LC: true,
      MF: true,
      PM: true,
      VC: true,
      WS: true,
      SM: true,
      ST: true,
      SA: true,
      SN: true,
      RS: true,
      SC: true,
      SL: true,
      SG: true,
      SX: true,
      SK: true,
      SI: true,
      SB: true,
      SO: true,
      ZA: true,
      GS: true,
      SS: true,
      ES: true,
      SD: true,
      SR: true,
      SJ: true,
      SZ: true,
      SE: true,
      CH: true,
      TW: true,
      TJ: true,
      TZ: true,
      TH: true,
      TL: true,
      TG: true,
      TK: true,
      TO: true,
      TR: true,
      TM: true,
      TC: true,
      TV: true,
      UG: true,
      UA: true,
      AE: true,
      GB: true,
      US: true,
      UM: true,
      UY: true,
      UZ: true,
      VU: true,
      VE: true,
      VN: true,
      VG: true,
      VI: true,
      WF: true,
      EH: true,
      ZM: true,
      ZW: true
    },
    cryptoCodes: {
      BTC: true,
      BCH: true,
      ETH: true,
      LTC: true,
      XRP: true
    },
    priority: 5,
    paymentType: 'credit'
  },

  wyre: {
    countryCodes: {
      US: true
    },
    cryptoCodes: {
      BTC: true,
      ETH: true,
      DAI: true
    },
    priority: 1,
    paymentType: 'bank'
  },

  moonpay: {
    countryCodes: {
      AT: true,
      BE: true,
      BG: true,
      HR: true,
      CA: true,
      CY: true,
      CZ: true,
      DK: true,
      EE: true,
      FI: true,
      FR: true,
      DE: true,
      GR: true,
      HU: true,
      IS: true,
      IE: true,
      IT: true,
      KR: true,
      LV: true,
      LI: true,
      LT: true,
      LU: true,
      MT: true,
      MX: true,
      NL: true,
      NO: true,
      PL: true,
      PT: true,
      RO: true,
      RU: true,
      SK: true,
      SI: true,
      ES: true,
      SE: true,
      ZA: true,
      GB: true
    },
    cryptoCodes: {
      BTC: true,
      BCH: true,
      ETH: true,
      DAI: true,
      LTC: true,
      EOS: true,
      XRP: true,
      XLM: true,
      BAT: true,
      BNB: true,
      PAX: true,
      TUSD: true,
      USDC: true,
      USDT: true
    },
    priority: 2,
    paymentType: 'credit'
  },

  safello: {
    countryCodes: {
      AD: true,
      AT: true,
      BE: true,
      HR: true,
      DK: true,
      EE: true,
      FI: true,
      FR: true,
      DE: true,
      GI: true,
      GR: true,
      GG: true,
      HU: true,
      IS: true,
      IE: true,
      IM: true,
      IT: true,
      JE: true,
      LV: true,
      LI: true,
      LT: true,
      LU: true,
      MT: true,
      MC: true,
      ME: true,
      NL: true,
      NO: true,
      PL: true,
      PT: true,
      SM: true,
      SK: true,
      SI: true,
      ES: true,
      SE: true,
      CH: true,
      GB: true
    },
    cryptoCodes: {
      BTC: true,
      ETH: true
    },
    priority: 4,
    paymentType: 'credit'
  },

  libertyx: {
    countryCodes: {
      US: true
    },
    cryptoCodes: {
      BTC: true
    },
    priority: 6,
    paymentType: 'cash'
  },

  banxa: {
    countryCodes: {
      AT: false,
      AU: true
    },
    cryptoCodes: {
      BTC: true
    },
    priority: 4,
    paymentType: 'bank'
  }
}