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
      const actual = await dijixAttestation.processProofs([
        { type: 'testType', data: 'test' },
        { type: 'testType', data: 'test', embed: 'test' },
        { data: 'noType', embed: 'testing' },
        'somestring',
        [1, 2, 3, 4],
        date,
      ], mockDijix);
      const expected = {
        proofs: [
          fakeIpfsHash,
          fakeIpfsHash,
          { data: 'noType', embed: 'testing' },
          'somestring',
          [1, 2, 3, 4],
          date,
        ],
        embeds: {
          // if we didnt use the fake type, this would be populated with some data
          test: { ipfsHash: 'fake ipfs hash' },
        },
      };
      assert.deepEqual(actual, expected);
    });
  });
  describe('creationPipeline', function () {
    it('creates the dijix object data', async function () {
      assert.deepEqual(
        await dijixAttestation.creationPipeline({
          proofs: [{ type: 'test' }, { type: 'test', embed: 'testEmbed' }],
          type: 'myType',
          attestation: { test: 'this is a test' },
        }, mockDijix),
        {
          type: 'myType',
          version: '0.0.1',
          attestation: { test: 'this is a test', testEmbed: { ipfsHash: 'fake ipfs hash' } },
          proofs: [fakeIpfsHash, fakeIpfsHash],
        },
      );
      assert.deepEqual(
        await dijixAttestation.creationPipeline({
          proofs: ['some string', 123, { type: 'test' }, { type: 'test', embed: 'hello' }, { myObj: true }],
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
