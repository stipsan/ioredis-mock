import { makeStoreSetCommand } from '../commands-utils/makeStoreCommand'
import { sunion } from './index'

export const sunionstore = makeStoreSetCommand(sunion)
