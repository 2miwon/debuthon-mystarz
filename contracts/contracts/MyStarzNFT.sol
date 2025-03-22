// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyStarzNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    address marketContractAddress;

    constructor(address contractAddress) ERC721("MyStarzNFT", "NFT") {
        marketContractAddress = contractAddress;
        _tokenIds = 0; // Initialize the tokenId counter
    }

    
    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    
    function tokenURI(uint256 _tokenId) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(_tokenId);
    }
    
    
    function mintNFT(address _recipient, string memory _tokenURI) public returns (uint256) {
        _tokenIds++;  // Increment the tokenId manually

        uint256 newItemId = _tokenIds;
        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        setApprovalForAll(marketContractAddress, true); // Grant transaction permission to the market

        return newItemId;
    }
}
