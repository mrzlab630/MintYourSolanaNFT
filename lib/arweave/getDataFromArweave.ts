/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-13
 * Time: 17:50
 * About:
 *
 */

import {IgetDataFromArweave} from "./types/IgetDataFromArweave"
import startAgentArweave from "./startAgentArweave"



const getDataFromArweave:IgetDataFromArweave = async function ({
                                                                   transactionId,
                                                                   timeout
                                                               }) {
    try {


        const {agent:arweave, error} = startAgentArweave({timeout})

        if(error || !arweave){
            throw new Error(error || `can't start arweave agent`)
        }

        const {data:dataTransaction} = await arweave.api.get(transactionId)
        //const dataTransaction = await arweave.transactions.getData(transactionId, {decode: true, string: true})


          //  console.info('dataTransaction ',dataTransaction)



        const getTags = await arweave.transactions.get(transactionId)

        console.log({getTags})

        const getTagsList = getTags.get('tags')

        console.log({getTagsList})

        if(Array.isArray(getTagsList)){
            console.log(`tags: `)

            getTagsList.forEach(tag => {
                let key = tag.get('name', {decode: true, string: true});
                let value = tag.get('value', {decode: true, string: true});
                console.log(`${key} : ${value}`);
            })
        }


        return {data:1}

    }catch (e) {
        console.error( {error:(e as any).message} )
        return {error:(e as any).message}
    }
}


export default getDataFromArweave