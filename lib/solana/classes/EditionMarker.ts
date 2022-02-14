/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:39
 * About:
 *
 */

import {MetadataKey,EDITION_MARKER_BIT_SIZE} from '../constants'
import Assignable from "./Assignable";

class EditionMarker {
    key;
    ledger;
    constructor(args:{[index:string]:any}) {
        this.key = MetadataKey.EditionMarker;
        this.ledger = args.ledger;
    }
    editionTaken(edition:any) {
        const editionOffset = edition % EDITION_MARKER_BIT_SIZE;
        const indexOffset = Math.floor(editionOffset / 8);
        if (indexOffset > 30) {
            throw Error('bad index for edition');
        }
        const positionInBitsetFromRight = 7 - (editionOffset % 8);
        const mask = Math.pow(2, positionInBitsetFromRight);
        const appliedMask = this.ledger[indexOffset] & mask;
        return appliedMask != 0;
    }
}

export default EditionMarker