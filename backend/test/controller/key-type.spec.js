process.env.NODE_ENV = "test";

const { getApp } = require("../../src/utils");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request(getApp()).keepOpen();

describe("Key_type", () => {
    it("Get empty array if db is empty", done => {
        request.get("/api/key_type").end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.be.eql(0);
            done();
        });
    });
    it("POST 5 key_types, and then GET them", done => {
        new Promise(resolve => {
            var j = 0;
            for (var i = 0; i < 5; i++) {
                request
                    .post("/api/key_type")
                    .type("form")
                    .send({
                        name: "IT" + i
                    })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(201);
                        j++;
                        if (j === 5) {
                            resolve();
                        }
                    });
            }
        }).then(() => {
            request.get("/api/key_type").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(5);
                done();
            });
        });
    });
});
