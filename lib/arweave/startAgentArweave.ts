/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-13
 * Time: 17:55
 * About:
 *
 */
import Arweave from 'arweave'
import {IstartAgentArweave} from "./types/IstartAgentArweave"



const startAgentArweave:IstartAgentArweave = function ({
                                        logging,
                                        timeout
                                    }) {
    try {

        timeout = timeout || 20000


        const agent = Arweave.init({
            host: 'arweave.net',// Hostname or IP address for a Arweave host
            port: 443,          // Port
            protocol: 'https',  // Network protocol http or https
            timeout,     // Network request timeouts in milliseconds
            logging,     // Enable network request logging
        })

        return {agent}


    }catch (e) {
        return {error:(e as any).message}
    }
}



export default startAgentArweave