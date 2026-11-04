import { describe, expect, it } from 'vitest';
import { decodeToken, signToken, verifyToken } from '../jwt';

describe('JWT Utilities', () => {
  it('should sign and verify a valid JWT token', () => {
    const payload = {
      sub: 'usr_123',
      email: 'pilot@tulpar.space',
      name: 'PILOT',
      role: 'user' as const,
    };

    const token = signToken(payload);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);

    const verified = verifyToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.sub).toBe('usr_123');
    expect(verified?.email).toBe('pilot@tulpar.space');
    expect(verified?.role).toBe('user');
  });

  it('should decode token payload without secret verification', () => {
    const payload = {
      sub: 'adm_999',
      email: 'admin@tulpar.space',
      name: 'ADMIN',
      role: 'admin' as const,
    };

    const token = signToken(payload);
    const decoded = decodeToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.sub).toBe('adm_999');
    expect(decoded?.role).toBe('admin');
  });

  it('should reject tampered tokens', () => {
    const payload = {
      sub: 'usr_123',
      email: 'pilot@tulpar.space',
      name: 'PILOT',
      role: 'user' as const,
    };

    const token = signToken(payload);
    const parts = token.split('.');
    // Tamper with payload part
    const tamperedToken = `${parts[0]}.eyJyZWFsbHkiOiJmYWtlIn0.${parts[2]}`;

    const verified = verifyToken(tamperedToken);
    expect(verified).toBeNull();
  });

  it('should return null for malformed tokens', () => {
    expect(verifyToken('invalid-token')).toBeNull();
    expect(verifyToken('a.b')).toBeNull();
    expect(decodeToken('invalid-token')).toBeNull();
  });
});
