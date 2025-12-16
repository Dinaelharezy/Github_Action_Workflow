const { Calculator } = require('./app.js');

describe('Calculator Class Tests', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    // Test initialization
    test('should initialize with default values', () => {
        expect(calculator.currentValue).toBe('0');
        expect(calculator.previousValue).toBe('');
        expect(calculator.operation).toBe(null);
    });

    // Test clear functionality
    test('should clear all values', () => {
        calculator.currentValue = '123';
        calculator.previousValue = '456';
        calculator.operation = '+';
        calculator.clear();
        
        expect(calculator.currentValue).toBe('0');
        expect(calculator.previousValue).toBe('');
        expect(calculator.operation).toBe(null);
    });

    // Test number appending
    test('should append number correctly', () => {
        calculator.appendNumber('5');
        expect(calculator.currentValue).toBe('5');
        
        calculator.appendNumber('3');
        expect(calculator.currentValue).toBe('53');
    });

    test('should handle decimal point', () => {
        calculator.appendNumber('5');
        calculator.appendNumber('.');
        calculator.appendNumber('5');
        expect(calculator.currentValue).toBe('5.5');
    });

    test('should not add multiple decimal points', () => {
        calculator.appendNumber('5');
        calculator.appendNumber('.');
        calculator.appendNumber('5');
        calculator.appendNumber('.');
        expect(calculator.currentValue).toBe('5.5');
    });

    // Test basic operations
    test('should add two numbers correctly', () => {
        calculator.appendNumber('5');
        calculator.chooseOperation('+');
        calculator.appendNumber('3');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('8');
    });

    test('should subtract two numbers correctly', () => {
        calculator.appendNumber('10');
        calculator.chooseOperation('-');
        calculator.appendNumber('4');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('6');
    });

    test('should multiply two numbers correctly', () => {
        calculator.appendNumber('6');
        calculator.chooseOperation('*');
        calculator.appendNumber('7');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('42');
    });

    test('should divide two numbers correctly', () => {
        calculator.appendNumber('20');
        calculator.chooseOperation('/');
        calculator.appendNumber('4');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('5');
    });

    test('should handle division by zero', () => {
        calculator.appendNumber('10');
        calculator.chooseOperation('/');
        calculator.appendNumber('0');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('Error');
    });

    // Test delete functionality
    test('should delete last digit', () => {
        calculator.appendNumber('1');
        calculator.appendNumber('2');
        calculator.appendNumber('3');
        calculator.delete();
        
        expect(calculator.currentValue).toBe('12');
    });

    test('should set to 0 when deleting last digit', () => {
        calculator.appendNumber('5');
        calculator.delete();
        
        expect(calculator.currentValue).toBe('0');
    });

    // Test chain operations
    test('should handle chain operations', () => {
        calculator.appendNumber('5');
        calculator.chooseOperation('+');
        calculator.appendNumber('3');
        calculator.chooseOperation('*');  // This should calculate 5+3=8 first
        calculator.appendNumber('2');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('16');
    });

    // Test decimal operations
    test('should handle decimal calculations', () => {
        calculator.appendNumber('1');
        calculator.appendNumber('.');
        calculator.appendNumber('5');
        calculator.chooseOperation('+');
        calculator.appendNumber('2');
        calculator.appendNumber('.');
        calculator.appendNumber('5');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('4');
    });

    // Test getDisplayValue
    test('should return current display value', () => {
        calculator.appendNumber('123');
        expect(calculator.getDisplayValue()).toBe('123');
    });

    // Test edge cases
    test('should replace 0 with first digit', () => {
        expect(calculator.currentValue).toBe('0');
        calculator.appendNumber('5');
        expect(calculator.currentValue).toBe('5');
    });

    test('should not replace 0 when adding decimal', () => {
        calculator.appendNumber('.');
        expect(calculator.currentValue).toBe('0.');
    });

    test('should reset display after calculation', () => {
        calculator.appendNumber('5');
        calculator.chooseOperation('+');
        calculator.appendNumber('3');
        calculator.calculate();
        calculator.appendNumber('2');
        
        expect(calculator.currentValue).toBe('2');
    });

    // Test negative numbers
    test('should handle negative results', () => {
        calculator.appendNumber('3');
        calculator.chooseOperation('-');
        calculator.appendNumber('10');
        calculator.calculate();
        
        expect(calculator.currentValue).toBe('-7');
    });
});