import {SUI_SYSTEM_STATE_OBJECT_ID, TransactionBlock} from '@mysten/sui.js';

function createStakeTransaction(amount, validator) {
    console.log("SUI_SYSTEM_STATE_OBJECT_ID",SUI_SYSTEM_STATE_OBJECT_ID);
    const tx = new TransactionBlock();
    const stakeCoin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
    console.log("stakeCoin",stakeCoin);
    tx.moveCall({
        target: '0x3::sui_system::request_add_stake',
        arguments: [
            tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
            stakeCoin,
            tx.pure(validator),
        ],
    });
    console.log("tx", tx);
     signer.signAndExecuteTransactionBlock({
         tx,
        options: {
            showInput: true,
            showEffects: true,
            showEvents: true,
        },
    });
}


createStakeTransaction(1000000000, "0x4f9791d5c689306862b4eb9a25914c5433b7dfd5cb4827b461f7dfc813f28a7c");
