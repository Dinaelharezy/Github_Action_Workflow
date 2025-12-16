
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentValue = '0';
            this.shouldResetDisplay = false;
        }
        
        if (number === '.' && this.currentValue.includes('.')) return;
        if (this.currentValue === '0' && number !== '.') {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.shouldResetDisplay = true;
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    result = 'Error';
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }
        
        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
    }

    getDisplayValue() {
        return this.currentValue;
    }

    delete() {
        if (this.currentValue.length === 1) {
            this.currentValue = '0';
        } else {
            this.currentValue = this.currentValue.slice(0, -1);
        }
    }
}

// UI Management
class CalculatorUI {
    constructor() {
        this.calculator = new Calculator();
        this.display = null;
    }

    createUI() {
        const container = document.createElement('div');
        container.className = 'calculator-container';
        container.innerHTML = `
            <div class="calculator">
                <div class="display" id="display">0</div>
                <div class="buttons">
                    <button class="btn btn-secondary" data-action="clear">C</button>
                    <button class="btn btn-secondary" data-action="delete">DEL</button>
                    <button class="btn btn-secondary" data-action="divide">/</button>
                    <button class="btn btn-operator" data-action="multiply">*</button>
                    
                    <button class="btn" data-number="7">7</button>
                    <button class="btn" data-number="8">8</button>
                    <button class="btn" data-number="9">9</button>
                    <button class="btn btn-operator" data-action="subtract">-</button>
                    
                    <button class="btn" data-number="4">4</button>
                    <button class="btn" data-number="5">5</button>
                    <button class="btn" data-number="6">6</button>
                    <button class="btn btn-operator" data-action="add">+</button>
                    
                    <button class="btn" data-number="1">1</button>
                    <button class="btn" data-number="2">2</button>
                    <button class="btn" data-number="3">3</button>
                    <button class="btn btn-equals" data-action="equals" style="grid-row: span 2">=</button>
                    
                    <button class="btn btn-zero" data-number="0" style="grid-column: span 2">0</button>
                    <button class="btn" data-number=">.</button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .calculator-container {
                padding: 20px;
            }

            .calculator {
                background: #fff;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                padding: 20px;
                width: 320px;
            }

            .display {
                background: #2d3748;
                color: #fff;
                font-size: 2.5rem;
                padding: 20px;
                text-align: right;
                border-radius: 10px;
                margin-bottom: 20px;
                min-height: 80px;
                word-wrap: break-word;
                overflow-wrap: break-word;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .buttons {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
            }

            .btn {
                background: #f7fafc;
                border: none;
                border-radius: 10px;
                padding: 20px;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                font-weight: 600;
                color: #2d3748;
            }

            .btn:hover {
                background: #edf2f7;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .btn:active {
                transform: translateY(0);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .btn-secondary {
                background: #fc8181;
                color: white;
            }

            .btn-secondary:hover {
                background: #f56565;
            }

            .btn-operator {
                background: #4299e1;
                color: white;
            }

            .btn-operator:hover {
                background: #3182ce;
            }

            .btn-equals {
                background: #48bb78;
                color: white;
            }

            .btn-equals:hover {
                background: #38a169;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(container);

        this.display = document.getElementById('display');
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.calculator.appendNumber(button.dataset.number);
                this.updateDisplay();
            });
        });

        document.querySelector('[data-action="add"]').addEventListener('click', () => {
            this.calculator.chooseOperation('+');
            this.updateDisplay();
        });

        document.querySelector('[data-action="subtract"]').addEventListener('click', () => {
            this.calculator.chooseOperation('-');
            this.updateDisplay();
        });

        document.querySelector('[data-action="multiply"]').addEventListener('click', () => {
            this.calculator.chooseOperation('*');
            this.updateDisplay();
        });

        document.querySelector('[data-action="divide"]').addEventListener('click', () => {
            this.calculator.chooseOperation('/');
            this.updateDisplay();
        });

        document.querySelector('[data-action="equals"]').addEventListener('click', () => {
            this.calculator.calculate();
            this.updateDisplay();
        });

        document.querySelector('[data-action="clear"]').addEventListener('click', () => {
            this.calculator.clear();
            this.updateDisplay();
        });

        document.querySelector('[data-action="delete"]').addEventListener('click', () => {
            this.calculator.delete();
            this.updateDisplay();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                this.calculator.appendNumber(e.key);
                this.updateDisplay();
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                this.calculator.chooseOperation(e.key);
                this.updateDisplay();
            } else if (e.key === 'Enter' || e.key === '=') {
                this.calculator.calculate();
                this.updateDisplay();
            } else if (e.key === 'Escape') {
                this.calculator.clear();
                this.updateDisplay();
            } else if (e.key === 'Backspace') {
                this.calculator.delete();
                this.updateDisplay();
            }
        });
    }

    updateDisplay() {
        this.display.textContent = this.calculator.getDisplayValue();
    }

    initialize() {
        this.createUI();
    }
}


if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const calcUI = new CalculatorUI();
            calcUI.initialize();
        });
    } else {
        const calcUI = new CalculatorUI();
        calcUI.initialize();
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Calculator, CalculatorUI };
}