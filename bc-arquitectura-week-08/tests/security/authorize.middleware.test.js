import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { authorize } from '../../src/interfaces/http/middlewares/authorize.js';

describe('authorize middleware', () => {
  // Helper para simular req/res/next
  const makeCtx = (role) => {
    const res = {
      _status: null,
      _body: null,
      status(s) { this._status = s; return this; },
      json(b) { this._body = b; return this; },
    };
    return {
      req: { user: role ? { userId: '1', role } : undefined },
      res,
    };
  };

  it('permite acceso a rol autorizado', () => {
    const ctx = makeCtx('OPERADOR');
    let nextCalled = false;
    authorize('ADMIN', 'OPERADOR')(ctx.req, ctx.res, () => { nextCalled = true; });
    assert.ok(nextCalled, 'next() debe llamarse para rol autorizado');
  });

  it('retorna 403 para rol no autorizado', () => {
    const ctx = makeCtx('CLIENTE');
    authorize('ADMIN')(ctx.req, ctx.res, () => {});
    assert.strictEqual(ctx.res._status, 403);
    assert.ok(ctx.res._body.error);
  });

  it('retorna 401 sin usuario autenticado', () => {
    const ctx = makeCtx(null);
    authorize('ADMIN')(ctx.req, ctx.res, () => {});
    assert.strictEqual(ctx.res._status, 401);
  });

  it('permite acceso a ADMIN en cualquier ruta', () => {
    const ctx = makeCtx('ADMIN');
    let nextCalled = false;
    authorize('ADMIN', 'OPERADOR', 'CLIENTE')(ctx.req, ctx.res, () => { nextCalled = true; });
    assert.ok(nextCalled);
  });

  it('retorna 403 cuando el rol no está en la lista permitida', () => {
    const ctx = makeCtx('OPERADOR');
    authorize('ADMIN')(ctx.req, ctx.res, () => {});
    assert.strictEqual(ctx.res._status, 403);
  });
});
