import AccountFactoryInterface from '../entities/interfaces/data/account.factory.interface'

import ShipperAdapter from '../adapters/shipper.adapter'
// import CarrierAdapter from '../adapters/carrier.adapter'


class AccountFactory {
    public account: AccountFactoryInterface  = {
        shipper: ShipperAdapter,
        // carrier: CarrierAdapter
    }
}

export default AccountFactory