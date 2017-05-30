import {StorageSpaceType} from "./storage-space-type";
import {StorageCell} from "./storage-cell";
/**
 * Created by Lenovo on 14.05.2017.
 */

export class StorageSpace {
  idStorageSpace: number;
  storageSpaceType: StorageSpaceType;
  storageCellList: StorageCell[]=[];
  status: boolean;
}
