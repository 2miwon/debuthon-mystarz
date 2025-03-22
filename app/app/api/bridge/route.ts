import { NextResponse } from "next/server";
import {
  ethers,
  parseUnits,
  AbiCoder,
  Wallet,
  JsonRpcProvider,
  encodeBytes32String,
  toUtf8Bytes,
  Contract,
} from "ethers";
import { dropsToXrp } from "xrpl";
// @ts-ignore
import { IAxelarExecutable } from "@axelar-network/axelar-gmp-sdk-solidity";

const axelarExecutableAbi = [
  {
    inputs: [
      { internalType: "bytes32", name: "commandId", type: "bytes32" },
      { internalType: "string", name: "sourceChain", type: "string" },
      { internalType: "string", name: "sourceAddress", type: "string" },
      { internalType: "bytes", name: "payload", type: "bytes" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function extractCommandId(executeData: string): string {
  // executeData는 일반적으로 ABI 인코딩된 형식임
  // 0x 접두사 제거 후 처음 32바이트(64자)가 commandId
  const dataWithoutPrefix = executeData.startsWith("0x")
    ? executeData.slice(2)
    : executeData;
  const commandId = "0x" + dataWithoutPrefix.slice(0, 64);
  return commandId;
}

const provider = new JsonRpcProvider("https://rpc.xrplevm.org");

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const interchainTransfer = {
      // TODO: Check if this is correct
      messageType: ethers.getBigInt("0"), // 0 - Send transfer
      tokenId: encodeBytes32String("uxrp"), // XRP token ID
      sourceAddress: toUtf8Bytes("rneW39mLuntP8RDKFcELba29BYb6U5ZQAG"),
      destinationAddress: toUtf8Bytes(
        "0xB8Bb795b364550281feb9037e70E366CEa379290"
      ),
      amount: parseUnits(dropsToXrp(body.amount).toString()),
      data: "0x",
    };

    const abiCoder = new AbiCoder();

    const messageEncoded = abiCoder.encode(
      ["uint256", "bytes32", "bytes", "bytes", "uint256", "bytes"],
      [
        interchainTransfer.messageType,
        interchainTransfer.tokenId,
        interchainTransfer.sourceAddress,
        interchainTransfer.destinationAddress,
        interchainTransfer.amount,
        interchainTransfer.data,
      ]
    );

    const hubMessage = abiCoder.encode(
      ["uint256", "string", "bytes"],
      // TODO: Check if this is correct
      [ethers.getBigInt("3"), "xrpl-evm", messageEncoded]
    );

    const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

    // const tx = await wallet.sendTransaction({
    //   from: wallet.address,
    //   to: "0x48CF6E93C4C1b014F719Db2aeF049AA86A255fE2", // IAxelarExecutable 컨트랙트 주소
    //   data: "EXECUTE_DATA",
    //   value: "0",
    // });
    // await tx.wait();

    const appContract = new Contract(
      "0x48CF6E93C4C1b014F719Db2aeF049AA86A255fE2", // IAxelarExecutable 컨트랙트 주소
      IAxelarExecutable.abi,
      wallet
    );
    const tx = await appContract.execute(
      ethers.getBigInt("0"), // 0 - Send transfer
      "axelarnet",
      "0xB8Bb795b364550281feb9037e70E366CEa379290",
      hubMessage
    );
    const receipt = await tx.wait();

    return NextResponse.json(
      { success: true, transactionHash: receipt.hash },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// health check
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
