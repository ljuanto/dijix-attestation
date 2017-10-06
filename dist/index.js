'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _awaiting = require('awaiting');

var a = _interopRequireWildcard(_awaiting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DijixAttestation = function () {
  function DijixAttestation() {
    (0, _classCallCheck3.default)(this, DijixAttestation);

    this.type = 'attestation';
  }

  (0, _createClass3.default)(DijixAttestation, [{
    key: 'processProofs',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(proofConfigs, dijix) {
        var _this = this;

        var embeds, proofs;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (proofConfigs) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', {});

              case 2:
                embeds = {};
                _context2.next = 5;
                return a.map(proofConfigs, 1, function () {
                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(proof) {
                    var embed, proofData, dijixObject;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!((typeof proof === 'undefined' ? 'undefined' : (0, _typeof3.default)(proof)) !== 'object')) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt('return', proof);

                          case 2:
                            if (proof.type) {
                              _context.next = 4;
                              break;
                            }

                            return _context.abrupt('return', proof);

                          case 4:
                            embed = proof.embed, proofData = (0, _objectWithoutProperties3.default)(proof, ['embed']);
                            _context.next = 7;
                            return dijix.create(proof.type, proofData);

                          case 7:
                            dijixObject = _context.sent;

                            if (embed) {
                              embeds[embed] = dijixObject;
                            }
                            return _context.abrupt('return', dijixObject.ipfsHash);

                          case 10:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 5:
                proofs = _context2.sent;
                return _context2.abrupt('return', { proofs: proofs, embeds: embeds });

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function processProofs(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return processProofs;
    }()
  }, {
    key: 'creationPipeline',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(opts, dijix) {
        var _ref4, _ref4$proofs, proofs, _ref4$embeds, embeds, dijixObjectData, version, attestation;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.processProofs(opts.proofs, dijix);

              case 2:
                _ref4 = _context3.sent;
                _ref4$proofs = _ref4.proofs;
                proofs = _ref4$proofs === undefined ? [] : _ref4$proofs;
                _ref4$embeds = _ref4.embeds;
                embeds = _ref4$embeds === undefined ? {} : _ref4$embeds;
                dijixObjectData = { proofs: proofs };
                version = opts.version || opts.type && '0.0.1';

                if (version) {
                  dijixObjectData.version = version;
                }
                if (opts.type) {
                  dijixObjectData.type = opts.type;
                }
                attestation = (0, _typeof3.default)(opts.attestation) === 'object' ? (0, _extends3.default)({}, opts.attestation, embeds) : opts.attestation;

                if (opts.attestation) {
                  dijixObjectData.attestation = attestation;
                }
                return _context3.abrupt('return', dijixObjectData);

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function creationPipeline(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return creationPipeline;
    }()
  }]);
  return DijixAttestation;
}();

exports.default = DijixAttestation;