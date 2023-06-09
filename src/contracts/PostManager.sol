// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;
import "./Post.sol";

contract PostManager {
  uint256 postIDCounter;
  Post[] public posts;
  mapping(address => uint256) public postIDs;
  string public CID; //Content Identifier
  event CreatePost(address poster);

  function createPost(
    string memory _postCID
    
  ) external returns (bool) {
    uint256 postID = postIDCounter;
    postIDCounter++;
    Post post = new Post(msg.sender, _postCID);
    posts.push(post);
    postIDs[address(post)] = postID;
    CID = _postCID;
    emit CreatePost(msg.sender);
    return true;
  }

  function addComment(string memory _CID, address _postAddress)
    external
    returns (bool)
  {
    uint256 postID = postIDs[_postAddress];
    posts[postID].postComment(_CID, msg.sender, block.timestamp);
    return true;
  }

  function getPosts() external view returns (address[] memory _posts) {
    _posts = new address[](postIDCounter);
    for (uint256 i = 0; i < postIDCounter; i++) {
      _posts[i] = address(posts[i]);
    }
    return _posts;
  }

  function getPostsData(address[] calldata _postList)
    external
    view
    returns (
      address[] memory posterAddress,
      uint256[] memory numberOfComments,
      string memory postCID
    )
  {
    posterAddress = new address[](_postList.length);
    numberOfComments = new uint256[](_postList.length);
    postCID = CID;
    for (uint256 i = 0; i < _postList.length; i++) {
      uint256 postID = postIDs[_postList[i]];
      posterAddress[i] = posts[postID].poster();
      numberOfComments[i] = posts[postID].commentListLength();
    }
    return (posterAddress, numberOfComments, postCID);
  }
}   