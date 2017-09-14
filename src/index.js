import * as a from 'awaiting';

export default class DijixAttestation {
  constructor() {
    this.type = 'attestation';
  }
  async processProofs(proofs, dijix) {
    if (!proofs) return [];
    return a.map(proofs, 1, async (proof) => {
      if (typeof proof !== 'object') { return proof; }
      if (!proof.type) { return proof; }
      return (dijix.create(proof.type, proof)).ipfsHash;
    });
  }
  async creationPipeline(opts, dijix) {
    const dijixObjectData = {
      proofs: await this.processProofs(opts.proofs, dijix),
    };
    const version = opts.version || (opts.type && '0.0.1');
    if (version) { dijixObjectData.version = version; }
    if (opts.type) { dijixObjectData.type = opts.type; }
    if (opts.attestation) { dijixObjectData.attestation = opts.attestation; }
    return dijixObjectData;
  }
}
