import ShipperAdapter from '../../../adapters/shipper.adapter'

interface AccountFactoryInterface {
    shipper: typeof ShipperAdapter
}

export default AccountFactoryInterface