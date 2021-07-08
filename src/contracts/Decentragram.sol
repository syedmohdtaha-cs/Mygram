pragma solidity ^0.5.0;

contract Decentragram {
  string public name = "Decentragram";

  uint public imageCount = 0;
  mapping(uint => Image) public images;

  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }
  
  event ImageCreated (
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );
  event ImageTipped (
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

  function uploadImage(string memory _imghash, string memory _description) public {


        require(msg.sender != address(0x0));
        require(bytes(_imghash).length > 0);
        require(bytes(_description).length > 0);
        imageCount ++;

        images[imageCount] = Image(imageCount,_imghash,_description,0,msg.sender);
        emit ImageCreated(imageCount,_imghash,_description,0,msg.sender);

 }

 function tipImageOwner(uint _id) public payable {

   require(_id > 0 && _id <= imageCount);
   
   
   // fetches the id for tipping image
   Image memory _image = images[_id];
   //fetch the author
   address payable _author = _image.author;
  
   // pay the author by sending them ether
   address(_author).transfer(msg.value);

   _image.tipAmount = _image.tipAmount + msg.value;

   images[_id] = _image;
   
   emit ImageTipped(_id,_image.hash,_image.description,_image.tipAmount,_author);

 }
  
 }