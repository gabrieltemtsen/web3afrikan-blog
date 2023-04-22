// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

contract Post {
  address public poster;
  string public postCID;
  string[] public comments;
  address[] public commentIDs;
  uint256[] public commentTimeStamps;
  

  constructor(
    address _poster,
    string memory _postCID
  ) {
    poster = _poster;
    postCID = _postCID;
  }

  event PostComment(address user);

  function postComment(string memory _CID, address _commenter, uint256 _timeStamp)
    public
    returns (bool)
  {
    commentIDs.push(_commenter);
    comments.push(_CID);
    commentTimeStamps.push(_timeStamp);
    emit PostComment(_commenter);
    return true;
  }

  function commentListLength() public view returns (uint256) {
    return commentIDs.length;
  }
  function getComments() public view returns (string[] memory) {
    return comments;
  }

  function getDetailedPostInformation()
    public
    view
    returns (
      address[] memory _commentIDs,
      uint256[] memory _commentTimeStamps
    )
  {
    return (commentIDs, commentTimeStamps);
  }

}