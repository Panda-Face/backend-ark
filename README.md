# ARK based stable coin

> Lead Maintainer: [fx thoorens](https://github.com/fix)

## Introduction

> This repository is a version of ark for the purpose of stable coin mechanics.
> It bascially impose masterkey signatures on different transactions (main one for delegate registration) in order to fine tune the permission network. Between fully permissioned (any transactino should be validated beforehand) to somewhat public (only delegate registrations are permissioned). Also a special masterkey (could be different) can mint, burn (TODO: or seize) tokens.

## Getting Started

In order to lauch your testnet on your local machine

-   Install nodejs, yarn and postgresql 9.6.x
-   Checkout this repository
-   `git clone https://github.com/panda-face/backend-ark`
-   `cd backend-ark`
-   `git checkout stablecoin`
-   `yarn setup`

Then you need to create a genesis blocks as well as the first federation of block producers (called delegates)

-   `cd packages/core`
-   `bin/run network:generate --network=myeuro --premine=0 --delegates=5 --blocktime=60 --rewardAmount=0 --token=eur --symbol=€ --premine=0 --explorer=http://localhost:4200 --pubKeyHash=33 --wif=170`

Keep all default in the prompts and enter `y` for the last question:

```
✔ the name of the network that should be used … myeuro
✔ the amount of token pre-mined … 0
✔ the number of delegates to generate … 5
✔ the network blocktime … 60
✔ the maximum number of transactions per block … 150
✔ the maximum payload length by block … 2097152
✔ the height at which the delegate block reward kicks in … 75600
✔ the amount of the block reward … 0
✔ the public key hash … 33
✔ the WIF that should be used … 170
✔ the token name that should be used … eur
✔ the symbol that should be used … €
✔ the explorer url that should be used … http://localhost:4200
✔ Can you confirm? … yes
  ✔ Prepare directories
  ✔ Generate crypto network configuration
  ✔ Generate core network configuration
```

It has created two sets of coonfig files:

-   one located under `packages/core/bin/config/myeuro` with settings to launch a node. In `plugins.json` you can tweak database name and in `delegates.json` the passphrase of the delegates registered in the genesis block that will be pickedup by the node in order to produce blocks
-   one located under `packages/crypto/src/networks/myeuro` containing the constants of your network (`genesisBlock.json`, `milestones.json` setting up hardforks if needed, network.json with all the details of your network identity so that are publish for desktop and mobile wallet to autoconfigure)

You need then to publish that network to the compiled src:

-   `nano ../crypto/src/networks/index.ts` and add at the end of the file `export { myeuro } from "./myeuro";`
-   `cd ../..`
-   `yarn build`
-   `cd packages/core`
-   `bin/run config:publish`
    Select the network called `myeuro`

Create a fresh database and a user `ark`:

-   `createuser ark`
-   `createdb ark_myeuro`
    Launch your local node:
-   `CORE_PATH_CONFIG=./bin/config/myeuro yarn ark core:run --network=myeuro --networkStart --env=test`

Et voilà! you should see something similar to

```
[2019-12-05 13:55:06.529] DEBUG: ark-core 2.5.28
[2019-12-05 13:55:06.536] DEBUG: Data Directory: /Users/fixcrypt/Library/Application Support/ark-core/myeuro
[2019-12-05 13:55:06.536] DEBUG: Config Directory: ./bin/config/myeuro
[2019-12-05 13:55:06.537] DEBUG: Cache Directory: /Users/fixcrypt/Library/Caches/ark-core/myeuro
[2019-12-05 13:55:06.537] DEBUG: Log Directory: /Users/fixcrypt/Library/Logs/ark-core/myeuro
[2019-12-05 13:55:06.537] DEBUG: Temp Directory: /var/folders/j5/vfb2fz_s1wq61ghjsg_262th0000gn/T/ark-core/myeuro
[2019-12-05 13:55:06.943] INFO : Starting Database Manager
[2019-12-05 13:55:06.944] INFO : Establishing Database Connection
[2019-12-05 13:55:06.944] DEBUG: Connecting to database
[2019-12-05 13:55:07.047] DEBUG: Migrating 20180305100000-create-wallets-table
[2019-12-05 13:55:07.057] DEBUG: Migrating 20180305200000-create-rounds-table
[2019-12-05 13:55:07.062] DEBUG: Migrating 20180305300000-create-blocks-table
[2019-12-05 13:55:07.070] DEBUG: Migrating 20180305400000-create-transactions-table
[2019-12-05 13:55:07.076] DEBUG: Migrating 20181129400000-add-block_id-index-to-transactions-table
[2019-12-05 13:55:07.079] DEBUG: Migrating 20181204100000-add-generator_public_key-index-to-blocks-table
[2019-12-05 13:55:07.084] DEBUG: Migrating 20181204200000-add-timestamp-index-to-blocks-table
[2019-12-05 13:55:07.087] DEBUG: Migrating 20181204300000-add-sender_public_key-index-to-transactions-table
[2019-12-05 13:55:07.091] DEBUG: Migrating 20181204400000-add-recipient_id-index-to-transactions-table
[2019-12-05 13:55:07.094] DEBUG: Migrating 20190307000000-drop-wallets-table
[2019-12-05 13:55:07.099] WARN : Migrating transactions table. This may take a while.
[2019-12-05 13:55:07.102] DEBUG: Migrating 20190606000000-add-block-id-foreign-key-on-transactions
[2019-12-05 13:55:07.106] DEBUG: Migrating 20190619000000-drop-id-column-from-rounds-table
[2019-12-05 13:55:07.110] DEBUG: Migrating 20190626000000-enforce-chained-blocks
[2019-12-05 13:55:07.114] DEBUG: Connected to database.
[2019-12-05 13:55:07.170] WARN : No block found in database
[2019-12-05 13:55:07.796] INFO : Connecting to transaction pool
[2019-12-05 13:55:08.054] INFO : Starting P2P Interface
[2019-12-05 13:55:08.948] INFO : Socket worker started, PID: 72576
[2019-12-05 13:55:08.949] INFO : Socket worker started, PID: 72577
[2019-12-05 13:55:09.010] WARN : ARK Core is launched in Genesis Start mode. This is usually for starting the first node on the blockchain. Unless you know what you are doing, this is likely wrong.
[2019-12-05 13:55:09.010] INFO : Starting ARK Core for a new world, welcome aboard
[2019-12-05 13:55:09.013] INFO : Starting Blockchain Manager :chains:
[2019-12-05 13:55:09.016] DEBUG: event 'START': "uninitialised" -> "init" -> actions: [init]
[2019-12-05 13:55:09.024] INFO : Verifying database integrity
[2019-12-05 13:55:09.033] INFO : Verified database integrity
[2019-12-05 13:55:09.035] INFO : State Generation - Step 1 of 6: Block Rewards
[2019-12-05 13:55:09.038] INFO : State Generation - Step 2 of 6: Fees
[2019-12-05 13:55:09.040] INFO : State Generation - Step 3 of 6: Transfer
[2019-12-05 13:55:09.041] INFO : State Generation - Step 4 of 6: SecondSignature
[2019-12-05 13:55:09.042] INFO : State Generation - Step 5 of 6: DelegateRegistration
[2019-12-05 13:55:09.048] INFO : State Generation - Step 6 of 6: Vote
[2019-12-05 13:55:09.049] INFO : State Generation complete! Wallets in memory: 6
[2019-12-05 13:55:09.049] INFO : Number of registered delegates: 5
[2019-12-05 13:55:09.051] INFO : Starting Round 1
[2019-12-05 13:55:09.054] DEBUG: Loaded 5 active delegates
[2019-12-05 13:55:09.054] INFO : Saving round 1
[2019-12-05 13:55:09.060] INFO : Transaction Pool Manager build wallets complete
[2019-12-05 13:55:09.063] INFO : Your network connectivity has been verified by 1.1.1.1
[2019-12-05 13:55:09.124] INFO : Your NTP connectivity has been verified by time.google.com
[2019-12-05 13:55:09.125] INFO : Local clock is off by 8ms from NTP
[2019-12-05 13:55:10.129] DEBUG: event 'STARTED': "init" -> {"syncWithNetwork":"syncing"} -> actions: [checkLastDownloadedBlockSynced]
[2019-12-05 13:55:10.131] DEBUG: Queued chunks of blocks (process: 0)
[2019-12-05 13:55:10.133] DEBUG: event 'TEST': {"syncWithNetwork":"syncing"} -> "idle" -> actions: [checkLater, blockchainReady]
[2019-12-05 13:55:11.020] INFO : Checking 0 peers
[2019-12-05 13:55:11.515] INFO : Public HTTP API Server running at: http://0.0.0.0:4003
[2019-12-05 13:55:11.515] INFO : Wallet API Server running at: http://0.0.0.0:4040
[2019-12-05 13:55:11.609] INFO : Webhooks are disabled
[2019-12-05 13:55:11.814] INFO : Loaded 5 active delegates: genesis_1 (03d53c0400f37d792102e49c5f008c401f0c2274cd6dd09be4efdfb1a4675f7b6d), genesis_2 (0210af7485282ee9b496dc881a3a25b04a20e6d7c6b4079a75ac28c58d8e8c9724), genesis_3 (03b0796e1a93581f2190a375377b1be485800029f4e8a90156fcf5360d2f7ec8b7), genesis_4 (02f6c88b847596c0b3ddfa9d1b76d4be548fdd85b1e47d4bfc3fbda676edac6c7a), genesis_5 (027b3c1547e3f7bced13e2492c22320e5ceec6209dd08ed9497cc48aaabb88d49b)
[2019-12-05 13:55:11.814] INFO : Forger Manager started.
[2019-12-05 13:55:12.051] INFO : Exchange JSON-RPC Server is disabled
[2019-12-05 13:56:00.826] INFO : Checking 0 peers
[2019-12-05 13:56:00.833] DEBUG: Received 0 transactions from the pool containing 0
[2019-12-05 13:56:00.836] INFO : Forged new block 3aec87825d49847770440676059f664e3714a83bf776934c283af5086590ecc0 by delegate genesis_1 (03d53c0400f37d792102e49c5f008c401f0c2274cd6dd09be4efdfb1a4675f7b6d)
[2019-12-05 13:56:00.836] DEBUG: Broadcasting block 2 (3aec87825d49847770440676059f664e3714a83bf776934c283af5086590ecc0) with 0 transactions to 127.0.0.1
[2019-12-05 13:56:00.844] INFO : Received new block at height 2 with 0 transactions from 127.0.0.1
[2019-12-05 13:56:00.845] DEBUG: event 'NEWBLOCK': "idle" -> "newBlock"
[2019-12-05 13:56:00.850] DEBUG: Delegate genesis_1 (03d53c0400f37d792102e49c5f008c401f0c2274cd6dd09be4efdfb1a4675f7b6d) allowed to forge block 2
[2019-12-05 13:56:00.867] DEBUG: event 'PROCESSFINISHED': "newBlock" -> "idle" -> actions: [checkLater, blockchainReady]
[2019-12-05 13:56:01.369] INFO : Broadcasting block 2 to 0 peers
```

## Connectig desktop wallet

-   download and install ark wallet here https://github.com/ArkEcosystem/desktop-wallet/releases
-   when you launch create a new network and put your local server as a seed `http://localhost:4003/' and set a name (Stable Euro)
-   you can connect your ledger with the ark app on it to create wallet
-   import the minter wallet using the passphrase located in `packages/crypto/src/networks/myeuro/genesisWallet.json

## minting euros

-   CAVEAT: the desktop wallet is not meant to mint token, thus you need to disable in the wallet console the state `disabled="disabled"`of the Next button in order to get through the UX block when you send more tokens than your balance (ie minting)
-   in the minter wallet, select send, put address of a receiver wallet and set fees = 0.02
-   Hit Next and then Send

Et voila!

## lauching explorer
- `cd explorer`
- `yarn`
- create a file `networks/myeuro.json` an copy the following content
  ```
    {
      "title": "EURO Explorer",
      "server": "http://localhost:4003/api",
      "alias": "Stable Euro",
      "activeDelegates": 5,
      "rewardOffset": 10800,
      "currencies": [],
      "knownWallets": {},
      "defaults": {
        "token": "EUR",
        "symbol": "€",
        "currency": null,
        "priceChartOptions": {
          "enabled": true,
          "period": "day",
          "type": "price"
         }
       }
  }
  ```

then
- `yarn build --network myeuro`
- `nano ../packages/core/bin/config/myeuro/plugins.js` and add at the end `"@arkecosystem/core-explorer": { path: "../../explorer/dist" }`
- restart the node
- explorer is running here http://localhost:4200/

## ARK Documentation

-   Development : https://docs.ark.io/guidebook/core/development.html
-   Docker : https://docs.ark.io/guidebook/core/docker.html

## ARK API Documentation

-   API v1 : https://docs.ark.io/api/public/v1/
-   API v2 : https://docs.ark.io/api/public/v2/

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
