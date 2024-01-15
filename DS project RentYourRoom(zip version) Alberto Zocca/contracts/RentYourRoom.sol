pragma solidity ^0.8.22;

contract RentYourRoom {
    address payable addressContract;
    uint256 public roomCounter = 0;

    struct NewRoom {
        uint id;
        string name;
        string road;
        bool done;
        uint timestamp;
        string price;
    }

    event RoomCreated(
        uint id,
        string name,
        string road,
        bool done,
        uint timestamp,
        string price
    );

    event ToggledDone(uint id, bool done);

    mapping(uint => NewRoom) public tasks;

    constructor() {
        
        createRoom("Trump Tower", "721-725 Fifth Avenue, NewYork", "1");
        createRoom("Imperial Place", "1-1 Chiyoda, Chiyoda City, Tokyo, Japan", "1");
        createRoom("Municipal Market", "R. da Cantareira, 306, SP, Brazil","1");
        createRoom("Pantheon", "Piazza della Rotonda, Rome, Italy","1");
        createRoom("Kremlin Palace", "Vosdvizhenka str. 1, Moscow, Russia","1");
    }

    receive() external payable {}

    function createRoom(string memory _name, string memory _road, string memory _price)
        public
    {
        roomCounter++;
        tasks[roomCounter] = NewRoom(
            roomCounter,
            _name,
            _road,
            false,
            block.timestamp,
            _price
        );
        emit RoomCreated(
            roomCounter,
            _name,
            _road,
            false,
            block.timestamp,
            _price
        );
    }

    function roomUpdated(uint _id) external payable {
        NewRoom memory _room = tasks[_id];
        _room.done = !_room.done;
        tasks[_id] = _room;
        emit ToggledDone(_id, _room.done);
    }
}