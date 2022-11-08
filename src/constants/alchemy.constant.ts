type ParamObject = {
    fromBlock: string;
    toBlock: string;
    contractAddresses: string[];
    category: string[];
    withMetadata: boolean;
    excludeZeroValue: boolean;
    maxCount: string;
    fromAddress: string;
    order: string;
}

export type GetAsset = {
    id: number;
    jsonrpc: string;
    method: string;
    params: ParamObject[]
}

const getAssetObject: GetAsset = {
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params: [
        {
            fromBlock: "0x0",
            toBlock: "latest",
            contractAddresses: [],
            category: [
                "erc20"
            ],
            withMetadata: true,
            excludeZeroValue: true,
            maxCount: "0x3e8",
            fromAddress: "",
            order: ""
        }
    ]
}

export default getAssetObject;