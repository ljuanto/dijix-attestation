import * as a from 'awaiting';

export default class DijixAttestation {
  constructor() {
    this.type = 'attestation';
  }
  async processProofs(proofConfigs, dijix) {
    if (!proofConfigs) return {};
    const embeds = {};
    const proofs = await a.map(proofConfigs, 1, async (proof) => {
      if (typeof proof !== 'object') { return proof; }
      if (!proof.type) { return proof; }
      const { embed, ...proofData } = proof;
      const dijixObject = await dijix.create(proof.type, proofData);
      if (embed) {
        embeds[embed] = dijixObject;
      }
      return dijixObject.ipfsHash;
    });
    return { proofs, embeds };
  }
  async creationPipeline(opts, dijix) {
    const { proofs = [], embeds = {} } = (await this.processProofs(opts.proofs, dijix));
    const dijixObjectData = { proofs };
    const version = opts.version || (opts.type && '0.0.1');
    if (version) { dijixObjectData.version = version; }
    if (opts.type) { dijixObjectData.type = opts.type; }
    const attestation = typeof opts.attestation === 'object' ? { ...opts.attestation, ...embeds } : opts.attestation;
    if (opts.attestation) { dijixObjectData.attestation = attestation; }
    return dijixObjectData;
  }
}
