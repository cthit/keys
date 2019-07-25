process.env.NODE_ENV = "test";

const { getApp } = require("../../src/utils");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request(getApp()).keepOpen();

const PROPS = 2;

const postOneKeyType = name => {
    return new Promise((resolve, reject) => {
        try {
            request
                .post("/api/key_type")
                .type("form")
                .send({
                    name
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a("object");
                    expect(Object.keys(res.body).length).to.be.eql(1);
                    if (err != null) {
                        reject(err);
                    } else {
                        resolve({ err, res });
                    }
                });
        } catch (e) {
            reject(e);
        }
    });
};

const expectKeyType = (err, res, status, keyTypeExpect) => {
    expect(err).to.be.null;
    expect(res).to.have.status(status);
    expect(res.body).to.be.a("object");
    expect(Object.keys(res.body).length).to.be.eql(PROPS);
    const { name, id } = keyTypeExpect;
    if (name != null) expect(res.body.name).to.be.eql(name);
    else expect(res.body.name).to.not.be.null;

    if (id != null) expect(res.body.id).to.be.eql(id);
    else expect(res.body.id).to.not.be.null;
};

describe("Key_type", () => {
    describe("GET", () => {
        it("GET empty array if db is empty", done => {
            request.get("/api/key_type").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(0);
                done(err);
            });
        });
        it("POST 5 key_types, and then GET them", done => {
            Promise.all([
                postOneKeyType("IT1"),
                postOneKeyType("IT2"),
                postOneKeyType("IT3"),
                postOneKeyType("IT4"),
                postOneKeyType("IT5")
            ]).then(() => {
                request.get("/api/key_type").end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.be.eql(5);
                    done(err);
                });
            });
        });
        it("Try to GET key_type without a uuid and expect 400", done => {
            request.get("/api/key_type/asdf").end((err, res) => {
                expect(res).to.have.status(400);
                done(err);
            });
        });
        it("Try to GET key_type and expect 404", done => {
            request
                .get("/api/key_type/143b4a0a-49c2-4cb2-aa9d-9a7dd18ab273")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done(err);
                });
        });
    });

    describe("POST", () => {
        it("POST key_type, then GET it", done => {
            postOneKeyType("IT10").then(({ res }) => {
                request.get("/api/key_type/" + res.body.id).end((err, res) => {
                    expectKeyType(err, res, 200, { name: "IT10" });
                    done(err);
                });
            });
        });
        it("POST key_type without name should give 400", done => {
            request
                .post("/api/key_type")
                .type("form")
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done(err);
                });
        });
        it("POST key_type with empty name should give 400", done => {
            request
                .post("/api/key_type")
                .type("form")
                .send({ name: "" })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done(err);
                });
        });
    });
    describe("PUT", () => {
        it("POST Key_type, then PUT it, then GET it", done => {
            postOneKeyType("IT10").then(({ res }) => {
                const { id } = res.body;
                request
                    .put("/api/key_type/" + id)
                    .type("form")
                    .send({ name: "IT15" })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        request.get("/api/key_type/" + id).end((err, res) => {
                            expectKeyType(err, res, 200, {
                                name: "IT15"
                            });
                            done(err);
                        });
                    });
            });
        });
        it("Try to PUT key_type without a uuid and expect 400", done => {
            request.put("/api/key_type/asdf").end((err, res) => {
                expect(res).to.have.status(400);
                done(err);
            });
        });
        it("Try to PUT key_type and expect 404", done => {
            request
                .put("/api/key_type/143b4a0a-49c2-4cb2-aa9d-9a7dd18ab273")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done(err);
                });
        });
    });
    describe("DELETE", () => {
        it("POST Key_type, DELETE it and GET it", done => {
            postOneKeyType("IT5").then(({ res }) => {
                const { id } = res.body;
                request.delete("/api/key_type/" + id).end((err, res) => {
                    expect(res).to.have.status(200);
                    request.get("/api/key_type/" + id).end((err, res) => {
                        expect(res).to.have.status(404);
                        done(err);
                    });
                });
            });
        });
        it("Try to DELETE key_type without a uuid and expect 400", done => {
            request.delete("/api/key_type/asdf").end((err, res) => {
                expect(res).to.have.status(400);
                done(err);
            });
        });
        it("Try to DELETE key_type and expect 404", done => {
            request
                .delete("/api/key_type/143b4a0a-49c2-4cb2-aa9d-9a7dd18ab273")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done(err);
                });
        });
    });
});
