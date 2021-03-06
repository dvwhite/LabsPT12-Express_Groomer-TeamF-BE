const { errDetail } = require('./utils');

describe('The test suite', () => {
  test('errDetail returns the expected response shape', (done) => {
    // Mock out a res object
    const res = {
      body: {
        message: '',
        data: null,
      },
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      send(payload) {
        this.body.data = payload;
      },
      json(payload) {
        this.body.data = payload;
      },
    };

    const expectedErr = {
      message: 'There was a problem completing the required operation',
      validation: [],
      data: {},
    };
    const err = new Error('There was a testing error');

    errDetail(res, err);
    expect(res.code).toBe(500);
    expect(res.code).not.toBe(200);
    expect(res.body.data).toEqual(expectedErr);
    done();
  });
});
