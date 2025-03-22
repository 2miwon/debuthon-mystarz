// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MarketPlace {
    uint256 private _itemIds;
    uint256 private _itemsSoldOrCanceled;


    constructor () {}

    mapping(uint256 => MarketItem) idMarketItem;

    enum ItemStatus {  
        ON_SALE, SOLD, SALE_CANCELED
    }

    struct NFTToken {
        address contractAddr;
        uint256 tokenId;
    }

    struct MarketItem {
        uint256 itemId;
        NFTToken token;
        address payable seller;
        uint256 price;
        ItemStatus itemStatus;
    }

    event ItemCreated (
        uint256 tokenId,
        uint256 itemId,
        address seller,
        uint256 price
    );

    event ItemSold (
        uint256 tokenId,
        uint256 itemId,
        address seller,
        address buyer,
        uint256 price
    );

    event SaleCanceled (
        uint256 tokenId,
        uint256 itemId,
        address seller
    );

    function sell(
        address _contractAddr,
        uint256 _tokenId,
        uint256 _price
    ) public payable {
    
        require(_price > 0, "Price must be above zero");
    
        _itemIds++; // Increment the itemId manually
        uint256 itemId = _itemIds;

        idMarketItem[itemId] = MarketItem({
            itemId: itemId,
            token: NFTToken({
                contractAddr: _contractAddr,
                tokenId: _tokenId
            }),
            seller: payable(msg.sender),
            price: _price,
            itemStatus: ItemStatus.ON_SALE
        });

        ERC721(_contractAddr).transferFrom(msg.sender, address(this), _tokenId);

        emit ItemCreated(
            _tokenId,
            itemId,
            msg.sender,
            _price
        );
    }
function relist(
 
    uint256 _itemId,
    uint256 _price
) public {
    require(msg.sender == idMarketItem[_itemId].seller, "Only seller can relist");
    require(idMarketItem[_itemId].itemStatus == ItemStatus.SALE_CANCELED, "Item not canceled");
    require(_price > 0, "Price must be above zero");

    // 아이템의 상태를 ON_SALE로 변경
    idMarketItem[_itemId].itemStatus = ItemStatus.ON_SALE;
    idMarketItem[_itemId].price = _price;

    // 아이템이 다시 판매 리스트에 올라갔다는 이벤트 발생
    emit ItemCreated(
        idMarketItem[_itemId].token.tokenId,
        _itemId,
        msg.sender,
        _price
    );
}
    function saleCancel(
        address _contractAddr,
        uint256 _itemId
    ) public {
        require(msg.sender == idMarketItem[_itemId].seller, "only seller can cancel");
        require(ItemStatus.ON_SALE == idMarketItem[_itemId].itemStatus, "item is not on sale");

        uint tokenId = idMarketItem[_itemId].token.tokenId;

        ERC721(_contractAddr).transferFrom(address(this), msg.sender, tokenId);

        idMarketItem[_itemId].itemStatus = ItemStatus.SALE_CANCELED;
        _itemsSoldOrCanceled++; // Increment the canceled items count

        emit SaleCanceled(
            tokenId,
            _itemId,
            msg.sender
        );
    }

    function buy(
        address _contractAddr,
        uint256 _itemId
    ) public payable {
        uint256 price = idMarketItem[_itemId].price;
        uint256 tokenId = idMarketItem[_itemId].token.tokenId;
    
        require(msg.value == price, "Please submit the asking price in order to complete purchase");

        idMarketItem[_itemId].seller.transfer(msg.value);

        ERC721(_contractAddr).transferFrom(address(this), msg.sender, tokenId);
        idMarketItem[_itemId].itemStatus = ItemStatus.SOLD;
        _itemsSoldOrCanceled++; // Increment the sold items count

        emit ItemSold(
            tokenId,
            _itemId,
            idMarketItem[_itemId].seller,
            msg.sender,
            price
        );
    }

    function fetchItemsOnSale() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds;
        uint256 unsoldItemCount = _itemIds - _itemsSoldOrCanceled;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for (uint256 i = 1; i <= itemCount; i++) {
            if (idMarketItem[i].itemStatus == ItemStatus.ON_SALE) {
                uint256 currentId = idMarketItem[i].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyItemsOnSale() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (
                idMarketItem[i].itemStatus == ItemStatus.ON_SALE
                && idMarketItem[i].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (
                idMarketItem[i].itemStatus == ItemStatus.ON_SALE
                && idMarketItem[i].seller == msg.sender
            ) {
                uint256 currentId = idMarketItem[i].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
