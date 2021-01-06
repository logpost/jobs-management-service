import ShipperAdapter from '../../../adapters/shipper.adapter'
import CarrierAdapter from '../../../adapters/carrier.adapter'
interface AccountFactoryInterface {
	shipper: typeof ShipperAdapter
	carrier: typeof CarrierAdapter
}

export default AccountFactoryInterface
