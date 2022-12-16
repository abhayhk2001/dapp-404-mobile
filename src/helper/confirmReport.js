// const { startLoading, stopLoading } = require("./loader");

const confirmReport = async (contract, Provider, id, address) => {
    try {
        console.log(`Performing RPC`);
        // startLoading();
        let nonce = await Provider.eth.getTransactionCount(address);
        console.log(nonce);
        const _post = contract.methods.confirmReport(id);
        // await _post.call();
        let res = await _post.send({
        from:address,
        gas:10000000,
        nonce
        }).then((res)=>{
            alert("Report confirmed");
            console.log(res);
            // stopLoading();
        });
        console.log(res);
    } catch (error) {
        console.error('Error while confirming report >', error);
        // stopLoading();
        return false;
    }
};

export default confirmReport