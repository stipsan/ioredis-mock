import { sunion } from './index';
import { makeStoreSetCommand } from '../commands-utils/makeStoreCommand';

export const sunionstore = makeStoreSetCommand(sunion);
