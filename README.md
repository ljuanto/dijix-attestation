# Dijix Attestation

### Attestation Plugin for Dijix

```javascript
// a generic attestation
dijix.create('attestation', {
  // type: undefined, by default means it's generic, or pass a specific type
  // version: is 0.0.1 if type is set & left undefined,
  attestation: {
    someData: 'is true',
  },
  proofs: [
    { type: 'pdf', src: '...', ...data }, // must register these dijix plugins, config is passed
    { type: 'image', src: '...', embed: 'imageKey' ...data }, // use `embed` to embed the dijix object into the attestation using the passed key
    // if a non-object is passed, or type is not set, add a string(ify)
  ],
});
```
