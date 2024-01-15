const RentYourRoom = artifacts.require("RentYourRoom");

contract("RentYourRoom", (accounts) => {
  before(async () => {
    this.RentYourRoom = await RentYourRoom.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = await this.RentYourRoom.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get List Room", async () => {
    const tasksCounter = await this.RentYourRoom.tasksCounter();
    const task = await this.RentYourRoom.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter.toNumber());
    assert.equal(task.city, "New York");
    assert.equal(task.road, "725 5th Ave, New York, United States");
    assert.equal(task.price, "0.001");
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  });

  it("Room created successfully", async () => {
    const result = await this.RentYourRoom.createTask("City:  ", "Road: ");
    const taskEvent = result.logs[0].args;
    const tasksCounter = await this.RentYourRoom.tasksCounter();

    assert.equal(tasksCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.city, "City; ");
    assert.equal(taskEvent.road, "Adress: ");
    assert.equal(taskEvent.price, "0.001");
    assert.equal(taskEvent.done, false);
  });

  it("task toggled done", async () => {
    const result = await this.RentYourRoom.toggleDone(1);
    const taskEvent = result.logs[0].args;
    const task = await this.RentYourRoom.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskEvent.id.toNumber(), 1);
    assert.equal(taskEvent.done, true);
  });
});
