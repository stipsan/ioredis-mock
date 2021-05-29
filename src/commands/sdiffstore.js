import { sdiff } from './index';
import { makeStoreSetCommand } from "../commands-utils/makeStoreCommand";

export const sdiffstore = makeStoreSetCommand(sdiff);
