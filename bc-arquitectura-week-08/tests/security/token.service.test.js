import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';

// Configurar env mínimo para los tests ANTES de importar config
process.env.JWT_SECRET = 'test-secret-de-al-menos-32-caracteres-para-testing';
process.env.APP_NAME = 'agrotech-test';
process.env.NODE_ENV = 'test';

const { TokenService } = await import('../../src/infrastructure/security/token.service.js');

describe('TokenService', () => {
  let tokenService;

  before(() => {
    tokenService = new TokenService();
  });

  it('firma y verifica un token válido', () => {
    const payload = { userId: '123', role: 'OPERADOR' };
    const token = tokenService.sign(payload);

    assert.ok(typeof token === 'string', 'El token debe ser un string');
    assert.ok(token.split('.').length === 3, 'El token JWT debe tener 3 segmentos');

    const decoded = tokenService.verify(token);
    assert.strictEqual(decoded.userId, payload.userId);
    assert.strictEqual(decoded.role, payload.role);
  });

  it('lanza error en token manipulado', () => {
    const token = tokenService.sign({ userId: '123', role: 'OPERADOR' });
    const tampered = token.slice(0, -5) + 'xxxxx';

    assert.throws(
      () => tokenService.verify(tampered),
      /invalid signature|jwt malformed/i,
    );
  });

  it('lanza error en token expirado', async () => {
    // Firmar con expiración inmediata
    const { default: jwt } = await import('jsonwebtoken');
    const expiredToken = jwt.sign(
      { userId: '123', role: 'OPERADOR' },
      process.env.JWT_SECRET,
      { expiresIn: '0s' }
    );

    // Esperar 1ms para asegurar expiración
    await new Promise(r => setTimeout(r, 10));

    assert.throws(
      () => tokenService.verify(expiredToken),
      /jwt expired/i,
    );
  });
});
