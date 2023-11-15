import {describe, expect, test} from 'vitest'
import {longFormArgumentFrom, longFormFlagFrom} from "./argument-parser";

describe('extract long form argument', () => {
    test('existing', () => {
        expect(longFormArgumentFrom(['bogs', '--foo', 'foo-value'], 'foo', 'irrelevant')).to.eq('foo-value')
    });
    test('return fallback if not included', () => {
        expect(longFormArgumentFrom([], 'foo', 'fallback')).toEqual('fallback')
    });
});

describe('extract long form flag', () => {
    test('existing', () => {
        expect(longFormFlagFrom(['--the-flag'], 'the-flag', false)).toEqual(true)
    });
    test('return fallback if not included', () => {
        expect(longFormFlagFrom([], 'the-flag', true)).toEqual(true)
    });
})
