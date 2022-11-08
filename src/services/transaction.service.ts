import axios from "axios";
import getAssetObject, { GetAsset } from "../constants/alchemy.constant"
import { throwError } from "../helpers/ErrorHandler.helper";


export const getLatestTransaction = async (contractAddress: string, walletAddress: string) => {
    try {
        const dataAsset: GetAsset = getAssetObject;
        dataAsset.params[0].contractAddresses[0] = contractAddress;
        dataAsset.params[0].fromAddress = walletAddress;
        dataAsset.params[0].order = "desc";
        const axiosResponse = await axios.post(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, dataAsset)
        return axiosResponse.data.result.transfers;
    } catch (error: any) {
        throwError(500, `Error: ${error.response}`)
    }
}  