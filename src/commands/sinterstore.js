import { sinter } from './index';
import { makeStoreSetCommand } from "../commands-utils/makeStoreCommand";

export const sinterstore = makeStoreSetCommand(sinter);
