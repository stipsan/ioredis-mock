import { makeStoreSetCommand } from '../commands-utils/makeStoreCommand'
import { sdiff } from './index'

export const sdiffstore = makeStoreSetCommand(sdiff)
