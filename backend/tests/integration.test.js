const test = require('node:test');
const assert = require('node:assert');

// Import units to test directly in isolation
const passwordService = require('../services/auth/passwordService');
const jwtService = require('../services/auth/jwtService');
const responseParser = require('../services/ai/responseParser');
const responseValidator = require('../services/ai/responseValidator');
const cacheService = require('../services/review/cacheService');
const sanitizeCode = require('../utils/sanitizeCode');
const pagination = require('../utils/pagination');
const validators = require('../utils/validators');

test('AI Code Reviewer - Backend Unit & Integration Suite', async (t) => {

  await t.test('Password Service - Hashes and verifies password correctly', async () => {
    const password = 'SuperSecurePassword123!';
    const hash = await passwordService.hashPassword(password);
    
    assert.notStrictEqual(password, hash, 'Password and hash should not be identical');
    assert.strictEqual(hash.startsWith('$2a$') || hash.startsWith('$2b$'), true, 'Should be a valid bcrypt hash');
    
    const isMatch = await passwordService.comparePassword(password, hash);
    assert.strictEqual(isMatch, true, 'Should successfully verify correct password');
    
    const isMismatch = await passwordService.comparePassword('WrongPassword', hash);
    assert.strictEqual(isMismatch, false, 'Should fail verification for incorrect password');
  });

  await t.test('JWT Service - Encodes and decodes token correctly', () => {
    const payload = { id: 'mock-user-123', email: 'test@example.com' };
    const token = jwtService.generateToken(payload);
    
    assert.strictEqual(typeof token, 'string', 'Token should be a signed string');
    
    const decoded = jwtService.verifyToken(token);
    assert.ok(decoded, 'Decoded token should not be null');
    assert.strictEqual(decoded.id, payload.id, 'Decoded ID should match original payload');
    assert.strictEqual(decoded.email, payload.email, 'Decoded email should match original payload');
    
    const badDecoded = jwtService.verifyToken('invalid-signature-token');
    assert.strictEqual(badDecoded, null, 'Invalid token should return null');
  });

  await t.test('AI Response Parser - Strips markdown code blocks and parses clean JSON', () => {
    const rawMarkdownJson = '```json\n{\n  "improvedCode": "const x = 1;",\n  "explanation": "Simple code."\n}\n```';
    const parsed = responseParser.parse(rawMarkdownJson);
    
    assert.strictEqual(parsed.improvedCode, 'const x = 1;', 'Should parse correct improvedCode');
    assert.strictEqual(parsed.explanation, 'Simple code.', 'Should parse correct explanation');

    const rawDirectJson = '{\n  "improvedCode": "print(2)",\n  "explanation": "Python code."\n}';
    const parsedDirect = responseParser.parse(rawDirectJson);
    assert.strictEqual(parsedDirect.improvedCode, 'print(2)', 'Should parse correct improvedCode');
  });

  await t.test('AI Response Validator - Enforces defaults and schema typing', () => {
    const badInput = {
      explanation: 'Short test',
      detectedIssues: [
        {
          type: 'invalid-type-mapping',
          severity: 'critical-high',
          line: 'not-a-number',
          description: 'bad issue object'
        }
      ]
    };

    const validated = responseValidator.validate(badInput);
    
    assert.strictEqual(validated.improvedCode, '', 'Should default missing improvedCode to empty string');
    assert.strictEqual(validated.explanation, 'Short test', 'Should retain valid explanation');
    assert.strictEqual(validated.detectedIssues.length, 1, 'Should retain issues array item');
    
    const issue = validated.detectedIssues[0];
    assert.strictEqual(issue.type, 'readability', 'Should fall back invalid type to readability');
    assert.strictEqual(issue.severity, 'low', 'Should fall back invalid severity to low');
    assert.strictEqual(issue.line, null, 'Should convert non-numeric line string to null');
  });

  await t.test('Cache Service - Hits and evicts LRU cache correctly', () => {
    cacheService.clear();
    const code = 'function add(a, b) { return a + b; }';
    const language = 'javascript';
    const key = cacheService.generateKey(code, language);
    
    const initialCheck = cacheService.get(key);
    assert.strictEqual(initialCheck, null, 'Empty cache should return null');
    
    const reviewResult = { improvedCode: 'const add = (a, b) => a + b;' };
    cacheService.set(key, reviewResult);
    
    const hitCheck = cacheService.get(key);
    assert.ok(hitCheck, 'Cache should return stored review');
    assert.strictEqual(hitCheck.improvedCode, reviewResult.improvedCode);
  });

  await t.test('Code Sanitization - Removes null bytes and control characters', () => {
    const badInput = 'const x = 1;\0\x03\x19\nconst y = 2;';
    const sanitized = sanitizeCode.clean(badInput);
    assert.strictEqual(sanitized.includes('\0'), false, 'Should remove null bytes');
    assert.strictEqual(sanitized.includes('\x03'), false, 'Should remove ETX control character');
    assert.strictEqual(sanitized.includes('\n'), true, 'Should preserve valid newlines');
  });

  await t.test('Pagination - Calculates skip offsets and formats responses', () => {
    const { skip, limitNum } = pagination.getParams('3', '15');
    assert.strictEqual(skip, 30, 'Page 3 skip should be 30 (limit 15)');
    assert.strictEqual(limitNum, 15);
    
    const formatted = pagination.formatResponse(['review1', 'review2'], 100, 3, 15);
    assert.strictEqual(formatted.pagination.totalPages, 7, 'Total pages for 100 items with limit 15 should be 7');
    assert.strictEqual(formatted.pagination.hasNextPage, true, 'Page 3 has a next page');
    assert.strictEqual(formatted.pagination.hasPrevPage, true, 'Page 3 has a prev page');
  });

  await t.test('Input Validators - Verifies email, password, and empties', () => {
    assert.strictEqual(validators.isValidEmail('test@domain.com'), true);
    assert.strictEqual(validators.isValidEmail('bademail@'), false);
    assert.strictEqual(validators.isValidPassword('12345'), false, 'Password less than 6 characters should fail');
    assert.strictEqual(validators.isValidPassword('123456'), true);
    assert.strictEqual(validators.isEmpty(''), true);
    assert.strictEqual(validators.isEmpty('   '), true);
    assert.strictEqual(validators.isEmpty('hello'), false);
  });
});
