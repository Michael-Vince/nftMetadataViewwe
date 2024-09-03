import { createApp } from "@deroll/app";
import { stringToHex, hexToString } from "viem";

const app = createApp({
    url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004",
});

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const payloadString = hexToString(payload);
    const jsonPayload = JSON.parse(payloadString);

    const contractAddress = jsonPayload.contractAddress;
    const tokenId = jsonPayload.tokenId;

    // Assuming a helper function fetchNFTMetadata exists
    const metadata = await fetchNFTMetadata(contractAddress, tokenId);
    console.log(`NFT Metadata for Token ID ${tokenId}: `, metadata);

    const reportPayload = stringToHex(JSON.stringify(metadata));
    await app.createReport({ payload: reportPayload });

    return "accept";
});

// Start the application
app.start().catch((e) => {
    console.error(e);
    process.exit(1);
});
