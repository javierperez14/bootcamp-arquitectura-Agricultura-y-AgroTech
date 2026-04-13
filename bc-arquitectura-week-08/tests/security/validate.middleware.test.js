import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';
import { validate } from '../../src/interfaces/http/middlewares/validate.js';

describe('validate middleware', () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const makeCtx = (body) => {
    const res = {
      _status: null,
      _body: null,
      status(s) { this._status = s; return this; },
      json(b) { this._body = b; return this; },
    };
    return { req: { body }, res };
  };

  it('llama next() con datos válidos', () => {
    const ctx = makeCtx({ email: 'test@test.com', password: 'password123' });
    let nextCalled = false;
    validate(schema)(ctx.req, ctx.res, () => { nextCalled = true; });
    assert.ok(nextCalled);
  });

  it('retorna 400 con email inválido', () => {
    const ctx = makeCtx({ email: 'no-es-email', password: 'password123' });
    validate(schema)(ctx.req, ctx.res, () => {});
    assert.strictEqual(ctx.res._status, 400);
    assert.ok(ctx.res._body.details);
  });

  it('retorna 400 con contraseña muy corta', () => {
    const ctx = makeCtx({ email: 'test@test.com', password: '123' });
    validate(schema)(ctx.req, ctx.res, () => {});
    assert.strictEqual(ctx.res._status, 400);
  });

  it('reemplaza req.body con datos parseados por Zod', () => {
    const ctx = makeCtx({ email: '  TEST@TEST.COM  ', password: 'password123', extraField: 'ignorado' });
    validate(schema)(ctx.req, ctx.res, () => {});
    // Zod elimina campos extra por defecto
    assert.ok(!ctx.req.body.extraField);
  });
});
