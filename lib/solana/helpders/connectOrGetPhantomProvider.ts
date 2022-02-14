/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:41
 * About: Helpder function to detect whether Phantom wallet extension installed or not
 *
 */

const connectOrGetPhantomProvider = (connectToWallet:any) => {
    if ("solana" in window) {
        //@ts-ignore
        const provider = window?.solana;
        //@ts-ignore
        if(connectToWallet && !window.solana.isConnected){
            //@ts-ignore
            window.solana.connect();
        }
        if (provider.isPhantom) {
            return provider;
        }
    }else if(connectToWallet){
        alert(`Please install the phantom wallet from https://phantom.app/`);
    }


};


export default connectOrGetPhantomProvider