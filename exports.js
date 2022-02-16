const Web3 = require('web3')
const common = require("./common.js")
var fs = require('fs');
var SQL = require('./sql');
const filebuffer = fs.readFileSync('ocean.db');

function flushDB(binaryArray){
    fs.writeFileSync("ocean.db", binaryArray);
}
// Load the db
const db = new SQL.Database(filebuffer);

db.run("DROP TABLE IF EXISTS battle;");
db.run("CREATE TABLE IF NOT EXISTS battle (id,user,value);");
var binaryArray = db.export();
flushDB(binaryArray);

var abi =[
    {
      "anonymous":false,
      "inputs":[
        {
          "indexed":true,
          "internalType":"address",
          "name":"owner",
          "type":"address"
        },
        {
          "indexed":true,
          "internalType":"address",
          "name":"spender",
          "type":"address"
        },
        {
          "indexed":false,
          "internalType":"uint256",
          "name":"value",
          "type":"uint256"
        }
      ],
      "name":"Approval",
      "type":"event"
    },
    {
      "anonymous":false,
      "inputs":[
        {
          "indexed":true,
          "internalType":"address",
          "name":"previousOwner",
          "type":"address"
        },
        {
          "indexed":true,
          "internalType":"address",
          "name":"newOwner",
          "type":"address"
        }
      ],
      "name":"OwnershipTransferred",
      "type":"event"
    },
    {
      "anonymous":false,
      "inputs":[
        {
          "indexed":true,
          "internalType":"address",
          "name":"from",
          "type":"address"
        },
        {
          "indexed":true,
          "internalType":"address",
          "name":"to",
          "type":"address"
        },
        {
          "indexed":false,
          "internalType":"uint256",
          "name":"value",
          "type":"uint256"
        }
      ],
      "name":"Transfer",
      "type":"event"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"owner",
          "type":"address"
        },
        {
          "internalType":"address",
          "name":"spender",
          "type":"address"
        }
      ],
      "name":"allowance",
      "outputs":[
        {
          "internalType":"uint256",
          "name":"",
          "type":"uint256"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"spender",
          "type":"address"
        },
        {
          "internalType":"uint256",
          "name":"amount",
          "type":"uint256"
        }
      ],
      "name":"approve",
      "outputs":[
        {
          "internalType":"bool",
          "name":"",
          "type":"bool"
        }
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"account",
          "type":"address"
        }
      ],
      "name":"balanceOf",
      "outputs":[
        {
          "internalType":"uint256",
          "name":"",
          "type":"uint256"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    },
    {
      "inputs":[
        
      ],
      "name":"decimals",
      "outputs":[
        {
          "internalType":"uint8",
          "name":"",
          "type":"uint8"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"spender",
          "type":"address"
        },
        {
          "internalType":"uint256",
          "name":"subtractedValue",
          "type":"uint256"
        }
      ],
      "name":"decreaseAllowance",
      "outputs":[
        {
          "internalType":"bool",
          "name":"",
          "type":"bool"
        }
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"spender",
          "type":"address"
        },
        {
          "internalType":"uint256",
          "name":"addedValue",
          "type":"uint256"
        }
      ],
      "name":"increaseAllowance",
      "outputs":[
        {
          "internalType":"bool",
          "name":"",
          "type":"bool"
        }
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"_to",
          "type":"address"
        },
        {
          "internalType":"uint256",
          "name":"_amount",
          "type":"uint256"
        }
      ],
      "name":"mint",
      "outputs":[
        
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        
      ],
      "name":"name",
      "outputs":[
        {
          "internalType":"string",
          "name":"",
          "type":"string"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    },
    {
      "inputs":[
        
      ],
      "name":"owner",
      "outputs":[
        {
          "internalType":"address",
          "name":"",
          "type":"address"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    },
    {
      "inputs":[
        
      ],
      "name":"renounceOwnership",
      "outputs":[
        
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        
      ],
      "name":"symbol",
      "outputs":[
        {
          "internalType":"string",
          "name":"",
          "type":"string"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    },
    {
      "inputs":[
        
      ],
      "name":"totalSupply",
      "outputs":[
        {
          "internalType":"uint256",
          "name":"",
          "type":"uint256"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"recipient",
          "type":"address"
        },
        {
          "internalType":"uint256",
          "name":"amount",
          "type":"uint256"
        }
      ],
      "name":"transfer",
      "outputs":[
        {
          "internalType":"bool",
          "name":"",
          "type":"bool"
        }
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"sender",
          "type":"address"
        },
        {
          "internalType":"address",
          "name":"recipient",
          "type":"address"
        },
        {
          "internalType":"uint256",
          "name":"amount",
          "type":"uint256"
        }
      ],
      "name":"transferFrom",
      "outputs":[
        {
          "internalType":"bool",
          "name":"",
          "type":"bool"
        }
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    },
    {
      "inputs":[
        {
          "internalType":"address",
          "name":"newOwner",
          "type":"address"
        }
      ],
      "name":"transferOwnership",
      "outputs":[
        
      ],
      "stateMutability":"nonpayable",
      "type":"function"
    }
  ];

var contract_address = "0x2E3EA66bE5306E26c1Bda984079FE2ea388a5eCf";

// const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://bsc-ws-node.nariox.org:443"));
const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

//创建实例
var instance = new web3.eth.Contract(abi,contract_address);

var map = new Map();

var count = 0;
var fromBlock = 13347719;
var toBlock = 13349719;

for(i=0;i<=285;i++){
    setTimeout(function() {
        starShell(fromBlock,toBlock)
        fromBlock += 2000
        toBlock += 2000
    }, (i + 1) * 1000);
}

// function starMer(fromBlock,toBlock){
//     //质押
//     instance.getPastEvents('Deposit',  {
//         fromBlock: fromBlock,
//         toBlock: toBlock
//     }, function(error, event){
//         console.log(fromBlock,toBlock,event.length)
//         for(var i=0;i<event.length;i++){
//             var account = event[i].returnValues.user;
//             var value = event[i].returnValues.amount;

//             //todo 插入nft的dna、经验值、稀有度、等级
//             var  data = {
//                 blocknumber:event[i].blockNumber,
//                 hash:event[i].transactionHash,
//                 user:account,
//                 value:common.decimal(value,8),
//             }
//             if(map.get(data.hash) != 1){
//                 map.set(data.hash,1)
//                 // console.log("[质押]：",count,JSON.stringify(data));
//                 var stmt1 = db.prepare("select user from deposit where user=$user")
//                 const row = stmt1.getAsObject({$user:data.user});
//                 if(!row.user){
//                     db.run("INSERT INTO deposit VALUES (?,?,?,?,?)", [count,data.blocknumber,data.hash,data.user,data.value]);
//                     count += 1;
//                 }else{
//                     db.run("UPDATE deposit set value = value + ? where user = ?", [data.value,data.user]);
//                 }
//                 var binaryArray = db.export();
//                 flushDB(binaryArray);


//             }


//         }
//     })
// }

function starShell(fromBlock,toBlock){
   var filter = {  'to': '0x1aAe086D856aACBa31DF4dF20e3a9993Cb785ca8'}
    instance.getPastEvents('Transfer',  {
        filter,
        fromBlock: fromBlock,
        toBlock: toBlock
    }, function(error, event){
        if(typeof event == 'undefined'){
            return
        }

        console.log(fromBlock,toBlock);
        for(var i=0;i<event.length;i++){
          if(event[i].returnValues.to.toLowerCase() != '0x1aae086d856aacba31df4df20e3a9993cb785ca8'){
            return
         }

          console.log('event[i].returnValues:',event[i].returnValues);
            var account = event[i].returnValues.user;
            var value = event[i].returnValues.amount;

            //todo 插入nft的dna、经验值、稀有度、等级
            var  data = {
                blocknumber:event[i].blockNumber,
                hash:event[i].transactionHash,
                user:account,
                value:common.decimal(value,8),
            }
            if(map.get(data.hash) != 1){
                map.set(data.hash,1)
                // console.log("[质押]：",count,JSON.stringify(data));
                var stmt1 = db.prepare("select user from battle where user=$user")
                const row = stmt1.getAsObject({$user:data.user});
                if(!row.user){
                    db.run("INSERT INTO battle VALUES (?,?,?,?,?)", [count,data.blocknumber,data.hash,data.user,data.value]);
                    count += 1;
                }else{
                    db.run("UPDATE battle set value = value + ? where user = ?", [data.value,data.user]);
                }
                var binaryArray = db.export();
                flushDB(binaryArray);
            }
        }
    })
}

