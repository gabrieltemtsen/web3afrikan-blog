export const BLOG_MANAGER_CONTRACT_ADDRESS =
  '0x841FC8Db619a1C932507655913301B4e3faf9D55'
export const BLOG_MANAGER_ABI = [{"name":"CreatePost","inputs":[{"internalType":"address","name":"poster","type":"address"}],"type":"event"},{"name":"CID","outputs":[{"internalType":"string","name":"","type":"string"}],"type":"function","stateMutability":"view"},{"name":"addComment","inputs":[{"internalType":"string","name":"_CID","type":"string"},{"internalType":"address","name":"_postAddress","type":"address"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"},{"name":"createPost","inputs":[{"internalType":"string","name":"_postCID","type":"string"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"},{"name":"getPosts","outputs":[{"internalType":"address[]","name":"_posts","type":"address[]"}],"type":"function","stateMutability":"view"},{"name":"getPostsData","inputs":[{"internalType":"address[]","name":"_postList","type":"address[]"}],"outputs":[{"internalType":"address[]","name":"posterAddress","type":"address[]"},{"internalType":"uint256[]","name":"numberOfComments","type":"uint256[]"},{"internalType":"string","name":"postCID","type":"string"}],"type":"function","stateMutability":"view"},{"name":"postIDs","inputs":[{"internalType":"address","name":"","type":"address"}],"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"posts","inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"outputs":[{"internalType":"contract Post","name":"","type":"address"}],"type":"function","stateMutability":"view"}]
export const BLOG_POST_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_poster',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_postCID',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'PostComment',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'commentIDs',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'commentListLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'commentTimeStamps',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'comments',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getComments',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDetailedPostInformation',
    outputs: [
      {
        internalType: 'address[]',
        name: '_commentIDs',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_commentTimeStamps',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'postCID',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_CID',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_commenter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_timeStamp',
        type: 'uint256',
      },
    ],
    name: 'postComment',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poster',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
