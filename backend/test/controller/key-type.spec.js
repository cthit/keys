const { getApp } = require("../../src/utils");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();

chai.use(chaiHttp);

describe("key-type controller", () => {
    it("should return 200 if add is successful", () => {
        // setTimeout(() => {
        //     chai.request("http://localhost:4001")
        //         .get("/api/key_type")
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a("array");
        //             res.body.length.should.be.eql(0);
        //             done();
        //         });
        // }, 10000);
    });
});
