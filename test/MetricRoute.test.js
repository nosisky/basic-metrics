import request from 'supertest';
import server from '../server';

describe('Metric Logger Test ==>', () => {
    describe('Post Metrics Endpoint', () => {
        afterAll(async done => {
            done();
        });
        describe('Invalid Data', () => {
            it('should return back error when value data is missing', async () => {
                const res = await request(server)
                    .post('/api/v1/metric/active_visitors')
                    .send({
                        test: 'test is cool',
                    })
                expect(res.statusCode).toEqual(400)
                expect(res.body.message).toBe('Please insert numeric metric log value')
            })

            it('should return an error when metrics value is non-numeric', async () => {
                const res = await request(server)
                    .post('/api/v1/metric/active_visitors')
                    .send({
                        value: 'test',
                    })
                expect(res.statusCode).toEqual(400)
                expect(res.body.message).toBe('Please insert numeric metric log value')
            })

            it('should return an error when key is not active_visitors', async () => {
                const res = await request(server)
                    .post('/api/v1/metric/test')
                    .send({
                        value: 23,
                    })
                expect(res.statusCode).toEqual(400)
                expect(res.body.message).toBe('Unrecognized key!')
            })
        })

        describe('Valid Data', () => {
            it('should successfully log a metric when valid data is submited', async () => {
                const res = await request(server)
                    .post('/api/v1/metric/active_visitors')
                    .send({
                        value: 20,
                    })
                expect(res.statusCode).toEqual(200)
                expect(res.body.message).toBe('Metrics logged successfully!')
            })
        })
    })

    describe('Get Metrics Endpoint', () => {
        describe('Invalid Data', () => {
            it('should successfully log a metric when valid data is submited', async () => {
                const res = await request(server)
                    .get('/api/v1/metric/active_visitor/sum')
                expect(res.statusCode).toEqual(400)
                expect(res.body.message).toBe('Unrecognized key!')
            })
        })
        describe('Valid Data', () => {
            it('should successfully log a metric when valid data is submited', async () => {
                const res = await request(server)
                    .get('/api/v1/metric/active_visitors/sum')
                expect(res.statusCode).toEqual(200)
                expect(res.text).toBe('20')
            })
        })
    })

})