/* eslint-disable max-len */

import assert from 'assert';

import DijixAttestation from '../src';

const fakeIpfsHash = 'fake ipfs hash';

const mockDijix = {
  create: () => ({ ipfsHash: fakeIpfsHash }),
};

const dijixAttestation = new DijixAttestation();

describe('dijixAttestation', function () {
  describe('processProofs', function () {
    it('processes proofs', async function () {
      const date = new Date();
      assert.deepEqual(await dijixAttestation.processProofs([
        { type: 'testType', data: 'test' },
        { data: 'noType' },
        'somestring',
        [1, 2, 3, 4],
        date,
      ], mockDijix), [
        fakeIpfsHash,
        { data: 'noType' },
        'somestring',
        [1, 2, 3, 4],
        date,
      ]);
    });
  });
  describe('creationPipeline', function () {
    it('creates the dijix object data', async function () {
      assert.deepEqual(
        await dijixAttestation.creationPipeline({
          proofs: [{ type: 'test' }],
          type: 'myType',
          attestation: 'this is a test',
        }, mockDijix),
        {
          type: 'myType',
          version: '0.0.1',
          attestation: 'this is a test',
          proofs: [fakeIpfsHash],
        },
      );
      assert.deepEqual(
        await dijixAttestation.creationPipeline({
          proofs: ['some string', 123, { type: 'test' }, { type: 'test' }, { myObj: true }],
        }, mockDijix),
        { proofs: ['some string', 123, fakeIpfsHash, fakeIpfsHash, { myObj: true }] },
      );
      assert.deepEqual(
        await dijixAttestation.creationPipeline({ type: 'noVersion' }, mockDijix),
        { type: 'noVersion', version: '0.0.1', proofs: [] },
      );
    });
  });
});
