import { makeStoreSetCommand } from '../commands-utils/makeStoreCommand'
import { sinter } from './index'

export const sinterstore = makeStoreSetCommand(sinter)

export const sinterstoreBuffer = sinterstore
